import React, { useState } from 'react';
import { Language, SaccoProduct } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { LoanCalculator } from './LoanCalculator';
import {
  Coins,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Smartphone,
  ArrowRight,
  Calculator,
  CheckCircle2,
} from 'lucide-react';

interface ProductCatalogProps {
  currentLang: Language;
  products: SaccoProduct[];
  isAdmin: boolean;
  onOpenAdminConsole: () => void;
  onSelectProductForLoan: (product: SaccoProduct) => void;
  onSelectProductForAccount: (product: SaccoProduct) => void;
  onApplyWithCalculation: (calculationDetails: {
    amount: number;
    tenureMonths: number;
    loanType: string;
    monthlyPayment: number;
  }) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  currentLang,
  products,
  isAdmin,
  onOpenAdminConsole,
  onSelectProductForLoan,
  onSelectProductForAccount,
  onApplyWithCalculation,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'savings' | 'loans' | 'digital'>('all');
  const t = TRANSLATIONS[currentLang];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'savings':
        return <Coins className="w-5 h-5 text-emerald-700" />;
      case 'loans':
        return <TrendingUp className="w-5 h-5 text-[#1b3a27]" />;
      case 'digital':
        return <Smartphone className="w-5 h-5 text-sky-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section id="products" className="bg-slate-50 border-b border-slate-200">
      {/* Page Title Header */}
      <div className="bg-[#1a3c34] text-white py-14 sm:py-16 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-emerald-800/80 text-emerald-200 border border-emerald-600/30 mb-3">
            {currentLang === 'en' ? 'Our Cooperative Solutions' : 'Serivisi za Koperative'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t.products.title}
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-2xl mx-auto font-normal">
            {t.products.subtitle}
          </p>

          {/* Navigation Category Tabs */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-[#1a3c34] font-bold shadow-sm'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800/60'
              }`}
            >
              {t.products.allTab}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('savings')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'savings'
                  ? 'bg-white text-[#1a3c34] font-bold shadow-sm'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800/60'
              }`}
            >
              {t.products.savingsTab}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('loans')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'loans'
                  ? 'bg-white text-[#1a3c34] font-bold shadow-sm'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800/60'
              }`}
            >
              {t.products.loansTab}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('digital')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'digital'
                  ? 'bg-white text-[#1a3c34] font-bold shadow-sm'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800/60'
              }`}
            >
              {t.products.digitalTab}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isLoan = product.category === 'loans';
            const title = currentLang === 'en' ? product.titleEn : product.titleRw;
            const tagline = currentLang === 'en' ? product.taglineEn : product.taglineRw;
            const features = currentLang === 'en' ? product.featuresEn : product.featuresRw;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group p-6 sm:p-7 relative"
              >
                {product.popular && (
                  <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {currentLang === 'en' ? 'Most Popular' : 'Ikunzwe Cyane'}
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(product.category)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {title}
                      </h3>
                      {product.interestRate && (
                        <span className="text-xs font-semibold text-emerald-700 font-mono-numbers">
                          {product.interestRate}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {tagline}
                  </p>

                  {/* Key Features */}
                  {features && features.length > 0 && (
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-100">
                      {features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100">
                  {isLoan ? (
                    <button
                      type="button"
                      onClick={() => {
                        const calcEl = document.getElementById('calculator');
                        if (calcEl) {
                          calcEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="w-full py-2.5 px-4 bg-[#1b3a27] hover:bg-[#132c1c] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Calculator className="w-4 h-4 text-emerald-300" />
                      <span>{currentLang === 'en' ? 'Calculate This Loan' : 'Bara Iyi Nguzanyo'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectProductForAccount(product)}
                      className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-200" />
                      <span>{currentLang === 'en' ? 'Open Account' : 'Fungura Konti'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loan Calculator Integrated Directly Inside Our Services */}
      <div id="calculator" className="border-t border-[#DCCCFF]/60 bg-[#F5F0FF]/40 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b3a27] tracking-wider uppercase mb-1">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <span>{currentLang === 'en' ? 'Loan Repayment Simulator' : 'Kubara Ubwishyu bw\'Inguzanyo'}</span>
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentLang === 'en' ? 'Simulate Your Monthly Installments' : 'Bara Amafaranga Uzajya Wishyura Buri Kwezi'}
            </h3>
          </div>

          <LoanCalculator
            currentLang={currentLang}
            onApplyWithCalculation={onApplyWithCalculation}
          />
        </div>
      </div>
    </section>
  );
};


