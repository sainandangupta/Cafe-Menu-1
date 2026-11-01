'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { MenuItem } from '@/data/mockMenu';
import { X, UploadCloud, FileSpreadsheet, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (newItems: MenuItem[]) => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onImportSuccess
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [detectedColumns, setDetectedColumns] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<Record<string, unknown>[]>([]);
  const [parsedPreview, setParsedPreview] = useState<MenuItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Column mapping states
  const [nameCol, setNameCol] = useState('');
  const [sectionCol, setSectionCol] = useState('');
  const [categoryCol, setCategoryCol] = useState('');
  const [priceCol, setPriceCol] = useState('');
  const [descCol, setDescCol] = useState('');
  const [vegCol, setVegCol] = useState('');
  const [imageCol, setImageCol] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet);

        if (data.length === 0) {
          toast.error('The uploaded sheet is empty');
          setIsProcessing(false);
          return;
        }

        const cols = Object.keys(data[0]);
        setDetectedColumns(cols);
        setRawRows(data);

        // Auto-detect columns intelligently based on header names
        const findCol = (keywords: string[]) =>
          cols.find((c) =>
            keywords.some((k) => c.toLowerCase().includes(k))
          ) || '';

        const detectedName = findCol(['name', 'item', 'dish', 'title']);
        const detectedSection = findCol(['section', 'menu', 'type']);
        const detectedCategory = findCol(['category', 'group', 'sub']);
        const detectedPrice = findCol(['price', 'rate', 'cost', 'mrp', 'amount']);
        const detectedDesc = findCol(['desc', 'description', 'detail', 'info']);
        const detectedVeg = findCol(['veg', 'vegetarian', 'diet']);
        const detectedImage = findCol(['image', 'photo', 'img', 'picture', 'url']);

        setNameCol(detectedName || cols[0] || '');
        setSectionCol(detectedSection);
        setCategoryCol(detectedCategory);
        setPriceCol(detectedPrice);
        setDescCol(detectedDesc);
        setVegCol(detectedVeg);
        setImageCol(detectedImage);

        // Generate immediate preview
        generatePreview(data, {
          name: detectedName || cols[0],
          section: detectedSection,
          category: detectedCategory,
          price: detectedPrice,
          desc: detectedDesc,
          veg: detectedVeg,
          image: detectedImage
        });

        toast.success(`Analyzed ${data.length} dishes from ${file.name}`);
      } catch (err) {
        console.error(err);
        toast.error('Failed to parse Excel file. Please ensure it is a valid .xlsx or .xls file.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const generatePreview = (
    rows: Record<string, unknown>[],
    mapping: {
      name: string;
      section: string;
      category: string;
      price: string;
      desc: string;
      veg: string;
      image: string;
    }
  ) => {
    const items: MenuItem[] = rows.map((row, idx) => {
      const name = String(row[mapping.name] || `Dish ${idx + 1}`);

      // Map section
      const secVal = String(row[mapping.section] || '').toLowerCase();
      let sectionId: 'food' | 'drinks' | 'desserts' = 'food';
      if (secVal.includes('drink') || secVal.includes('shake') || secVal.includes('beverage') || secVal.includes('tea') || secVal.includes('coffee') || secVal.includes('juice')) {
        sectionId = 'drinks';
      } else if (secVal.includes('waffle') || secVal.includes('dessert') || secVal.includes('cake') || secVal.includes('brownie') || secVal.includes('sweet') || secVal.includes('chocolate')) {
        sectionId = 'desserts';
      }

      // Map price
      const priceRaw = String(row[mapping.price] || '0').replace(/[^0-9.]/g, '');
      const price = parseFloat(priceRaw) || 99;

      // Map veg
      const vegRaw = String(row[mapping.veg] || 'veg').toLowerCase();
      const isVeg = !vegRaw.includes('non');

      // Map image
      const imgRaw = String(row[mapping.image] || '');
      const defaultImg =
        sectionId === 'drinks'
          ? 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
          : sectionId === 'desserts'
          ? 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80'
          : 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80';

      return {
        id: `excel_${idx + 1}`,
        name,
        sectionId,
        category: String(row[mapping.category] || (sectionId === 'drinks' ? 'Special Drinks' : sectionId === 'desserts' ? 'Waffles & Sweets' : 'Special Delights')),
        price,
        description: String(row[mapping.desc] || `Delicious chef-prepared ${name}.`),
        ingredients: ['Fresh Ingredients', 'House Recipe'],
        isVeg,
        isAvailable: true,
        rating: 4.8,
        ratingCount: Math.floor(Math.random() * 80) + 20,
        image: imgRaw.startsWith('http') ? imgRaw : defaultImg,
        hasIceCreamAddon: sectionId === 'desserts'
      };
    });

    setParsedPreview(items);
  };

  const handleConfirmImport = () => {
    if (parsedPreview.length === 0) {
      toast.error('No items to import');
      return;
    }

    onImportSuccess(parsedPreview);
    toast.success(`Successfully loaded ${parsedPreview.length} dishes into your digital menu!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-zinc-200 p-6 flex flex-col no-scrollbar animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-zinc-900">
                Import Menu from Excel (.xlsx)
              </h3>
              <p className="text-xs text-zinc-500">
                Upload your menu spreadsheet & auto-map columns
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="mt-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 hover:border-emerald-500 rounded-2xl p-6 cursor-pointer bg-zinc-50/50 hover:bg-emerald-50/20 transition-all text-center">
            <UploadCloud className="w-8 h-8 text-emerald-600 mb-2" />
            <span className="text-xs font-bold text-zinc-800">
              {fileName ? fileName : 'Click to select Excel sheet (.xlsx, .xls)'}
            </span>
            <span className="text-[11px] text-zinc-400 mt-0.5">
              Supports columns for Item Name, Section, Category, Price, Ingredients, etc.
            </span>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Column Mapping Preview */}
        {detectedColumns.length > 0 && (
          <div className="mt-5 space-y-4">
            <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Detected <strong>{detectedColumns.length} columns</strong> and{' '}
                <strong>{rawRows.length} dishes</strong> in your Excel file.
              </span>
            </div>

            {/* Field Mappings */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-zinc-700 block mb-1">Item Name Column</label>
                <select
                  value={nameCol}
                  onChange={(e) => setNameCol(e.target.value)}
                  className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                >
                  {detectedColumns.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-700 block mb-1">Section (Food/Drinks/Desserts)</label>
                <select
                  value={sectionCol}
                  onChange={(e) => setSectionCol(e.target.value)}
                  className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                >
                  <option value="">-- Auto Infer --</option>
                  {detectedColumns.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-700 block mb-1">Category Column</label>
                <select
                  value={categoryCol}
                  onChange={(e) => setCategoryCol(e.target.value)}
                  className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                >
                  <option value="">-- Auto Infer --</option>
                  {detectedColumns.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-700 block mb-1">Price Column</label>
                <select
                  value={priceCol}
                  onChange={(e) => setPriceCol(e.target.value)}
                  className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                >
                  <option value="">-- Default --</option>
                  {detectedColumns.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview Box */}
            <div className="mt-3">
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                Preview of Dishes ({parsedPreview.length})
              </div>
              <div className="max-h-40 overflow-y-auto rounded-xl border border-zinc-200 divide-y divide-zinc-100 text-xs bg-zinc-50/50">
                {parsedPreview.slice(0, 5).map((p, idx) => (
                  <div key={idx} className="p-2 flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="font-bold text-zinc-800">{p.name}</span>
                      <span className="text-[11px] text-zinc-500 ml-2">
                        ({p.category} · {p.sectionId})
                      </span>
                    </div>
                    <span className="font-bold text-emerald-700">₹{p.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirmImport}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-98"
            >
              Apply Excel Menu to Live Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
