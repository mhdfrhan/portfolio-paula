import React, { useState } from 'react';
import { Smartphone, Eye, Code, Search, AlertCircle, Github } from 'lucide-react';

export default function SlideMobileTesting() {
  const [selectedMobileElement, setSelectedMobileElement] = useState<'DIALOG_TITLE' | 'NAME_FIELD' | 'PASS_FIELD' | 'OK_BTN'>('NAME_FIELD');
  const [panelView, setPanelView] = useState<'INSPECTOR' | 'CODE'>('INSPECTOR');

  // Node specifications representing Appium element inspector output for APIDemos Text Entry
  const elementSpecs = {
    DIALOG_TITLE: {
      name: "alertTitle HeaderText",
      class: "android.widget.TextView",
      resourceId: "android:id/alertTitle",
      xpath: "//android.widget.TextView[@resource-id='android:id/alertTitle']",
      text: "Text Entry dialog",
      clickable: "false",
      bounds: "[76,523][500,580]"
    },
    NAME_FIELD: {
      name: "username_edit InputField",
      class: "android.widget.EditText",
      resourceId: "io.appium.android.apis:id/username_edit",
      xpath: "//android.widget.EditText[@resource-id='io.appium.android.apis:id/username_edit']",
      text: "Weni",
      clickable: "true",
      bounds: "[128,642][512,700]"
    },
    PASS_FIELD: {
      name: "password_edit InputField",
      class: "android.widget.EditText",
      resourceId: "io.appium.android.apis:id/password_edit",
      xpath: "//android.widget.EditText[@resource-id='io.appium.android.apis:id/password_edit']",
      text: "12345",
      clickable: "true",
      bounds: "[128,720][512,778]"
    },
    OK_BTN: {
      name: "button1 SubmitButton",
      class: "android.widget.Button",
      resourceId: "android:id/button1",
      xpath: "//android.widget.Button[@resource-id='android:id/button1']",
      text: "OK",
      clickable: "true",
      bounds: "[384,810][512,868]"
    }
  };

  const currentSpec = elementSpecs[selectedMobileElement];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full items-start p-4">
      {/* Kolom Kiri: Deskripsi Proyek */}
      <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
        <div>
          {/* Tags */}
          <div className="inline-flex gap-2 mb-2 scale-95 origin-left">
            <span className="bg-[#d11450]/15 text-[#d11450] border border-[#d11450]/30 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              Mobile Testing
            </span>
            <span className="bg-neutral-800 text-neutral-100 text-[10px] uppercase font-mono px-2 py-0.5 font-bold">
              Appium (TS & WDIO)
            </span>
          </div>

          <h2 className="text-2xl font-black font-display text-[#d11450] tracking-tight leading-none mb-3">
            PROJECT 5 — MOBILE APP TESTING
          </h2>

          <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-3">
            Mengotomatisasi pengujian antarmuka aplikasi Android native menggunakan <strong>WebdriverIO + Appium</strong> dalam <strong>TypeScript</strong>. Proyek ini fokus pada pemetaan elemen (*element inspection*) dan penulisan asersi dinamis.
          </p>

          <div className="space-y-1.5 text-2xs sm:text-xs">
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-[#ff8000] font-bold font-sans">✓</span>
              <span><strong>TypeScript & WebdriverIO:</strong> Struktur kode modular, asinkron, dan bertipe aman.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-[#ff8000] font-bold font-sans">✓</span>
              <span><strong>Locator UiSelector:</strong> Pencarian elemen Android menggunakan string `UiSelector().text()`.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-[#ff8000] font-bold font-sans">✓</span>
              <span><strong>Alert Dialog Automation:</strong> Skenario pengujian lengkap dialog entri teks APIDemos.</span>
            </div>
            <div className="flex items-start gap-1.5 text-neutral-700">
              <span className="text-[#ff8000] font-bold font-sans">✓</span>
              <span><strong>Verifikasi Terstruktur:</strong> Validasi input teks secara dinamis dan trigger action button.</span>
            </div>
          </div>
        </div>

        {/* Proyek hasil detail card */}
        <div className="bg-[#ff8000]/10 border border-[#ff8000]/30 p-3 shadow-sm select-none">
          <h4 className="font-display font-black text-[#ff8000] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
            <Smartphone size={12} /> Hasil Mobile Testing:
          </h4>
          <p className="text-2xs text-[#7c2d12] font-sans leading-relaxed">
            Berhasil memetakan locator dan menulis skrip asersi otomatis untuk input nama dan password pada form Alert Dialog. Script sukses berjalan di emulator Android dalam waktu kurang dari 6 detik.
          </p>
          <div className="mt-2 text-left">
            <a 
              href="https://github.com/paulacarneliantobing" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-3xs uppercase tracking-widest bg-neutral-900 text-white px-2 py-1 hover:bg-neutral-800 transition-colors"
            >
              <Github size={10} /> REPO MOBILE SUITE ❯
            </a>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Simulator Viewport Emulator & Appium Inspector */}
      <div className="lg:col-span-1" /> {/* Layout gap spacer */}
      <div className="lg:col-span-6 w-full z-10 grid grid-cols-1 sm:grid-cols-12 gap-4">
        
        {/* Left column inside Right column: Android Phone Frame emulator */}
        <div className="sm:col-span-6 flex justify-center">
          <div className="w-[180px] h-[340px] bg-neutral-900 rounded-[24px] border-4 border-neutral-800 relative shadow-lg flex flex-col justify-between overflow-hidden p-3.5 select-none">
            {/* Phone Speaker grill & camera notch */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
              <div className="w-8 h-1 bg-neutral-800 rounded-full" />
              <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
            </div>

            {/* Simulated Android App Status header bar */}
            <div className="flex justify-between items-center text-[7px] text-zinc-400 font-mono pt-1">
              <span>09:41</span>
              <span>APIDemos 🔋</span>
            </div>

            {/* App Layout inside phone */}
            <div className="flex-1 bg-neutral-300 border border-neutral-400 rounded-md p-1.5 flex flex-col justify-center my-2 relative">
              
              {/* Alert Dialog Box Overlay */}
              <div className="bg-[#f0f0f0] border border-neutral-400 shadow-lg p-2.5 space-y-2 rounded-sm select-none">
                
                {/* Dialog Title */}
                <button 
                  onClick={() => setSelectedMobileElement('DIALOG_TITLE')}
                  className={`w-full text-left font-sans font-bold text-[8px] border pb-1 cursor-pointer transition-colors block leading-tight ${selectedMobileElement === 'DIALOG_TITLE' ? 'bg-amber-100 text-amber-900 border-amber-500 scale-[1.02]' : 'bg-transparent text-neutral-800 border-transparent hover:bg-neutral-200/50'}`}
                >
                  Text Entry dialog
                </button>

                {/* Form Fields */}
                <div className="space-y-1.5">
                  {/* Name Label & Field */}
                  <div className="space-y-0.5">
                    <span className="text-[6px] text-neutral-500 block font-sans">Name</span>
                    <button 
                      onClick={() => setSelectedMobileElement('NAME_FIELD')}
                      className={`w-full text-left p-1 border text-[7px] font-mono block cursor-pointer transition-all rounded-sm ${selectedMobileElement === 'NAME_FIELD' ? 'bg-amber-100 text-amber-950 border-amber-500 scale-[1.02]' : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'}`}
                    >
                      Weni
                    </button>
                  </div>

                  {/* Password Label & Field */}
                  <div className="space-y-0.5">
                    <span className="text-[6px] text-neutral-500 block font-sans">Password</span>
                    <button 
                      onClick={() => setSelectedMobileElement('PASS_FIELD')}
                      className={`w-full text-left p-1 border text-[7px] font-mono block cursor-pointer transition-all rounded-sm ${selectedMobileElement === 'PASS_FIELD' ? 'bg-amber-100 text-amber-950 border-amber-500 scale-[1.02]' : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'}`}
                    >
                      •••••
                    </button>
                  </div>
                </div>

                {/* Dialog Actions Buttons */}
                <div className="flex justify-end gap-1.5 pt-1">
                  <button 
                    onClick={() => setSelectedMobileElement('OK_BTN')}
                    className={`px-2 py-1 rounded-sm text-[7px] font-sans font-bold uppercase cursor-pointer transition-all ${selectedMobileElement === 'OK_BTN' ? 'bg-amber-500 text-amber-950 border border-amber-600 scale-[1.02]' : 'bg-neutral-200 text-neutral-700 border border-neutral-300 hover:bg-neutral-300'}`}
                  >
                    OK
                  </button>
                  <button className="px-2 py-1 bg-neutral-200 text-neutral-500 border border-neutral-300 text-[7px] font-sans rounded-sm pointer-events-none">
                    Cancel
                  </button>
                </div>

              </div>

            </div>

            {/* Android Home Navigation bar bottom */}
            <div className="flex justify-center pt-1 border-t border-neutral-800">
              <div className="w-10 h-0.5 bg-neutral-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right column inside Right column: Dynamic Appium inspector / Code preview */}
        <div className="sm:col-span-6 border-2 border-neutral-850 bg-neutral-900 rounded p-2.5 font-mono text-[9px] text-neutral-300 flex flex-col justify-between min-h-[300px]">
          <div>
            {/* Inspector Header style */}
            <div className="border-b border-neutral-800 pb-2 mb-3 flex items-center justify-between text-[8px] text-zinc-500 uppercase tracking-widest font-black">
              <span>{panelView === 'INSPECTOR' ? '⚡ APPIUM INSPECTOR' : '📄 text-entry.e2e.ts'}</span>
              
              {/* Tab Selector */}
              <div className="flex gap-1 border border-neutral-800 bg-neutral-950 p-0.5 rounded-sm">
                <button 
                  onClick={() => setPanelView('INSPECTOR')}
                  className={`px-1.5 py-0.5 text-[7px] uppercase font-bold rounded-sm ${panelView === 'INSPECTOR' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-neutral-200'}`}
                >
                  Inspect
                </button>
                <button 
                  onClick={() => setPanelView('CODE')}
                  className={`px-1.5 py-0.5 text-[7px] uppercase font-bold rounded-sm ${panelView === 'CODE' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-400 hover:text-neutral-200'}`}
                >
                  Code
                </button>
              </div>
            </div>

            {panelView === 'INSPECTOR' ? (
              <div className="space-y-2 select-text">
                <div>
                  <span className="text-stone-500 block text-[8px] uppercase font-sans">Element ID:</span>
                  <span className="text-amber-400 font-bold text-xs">{currentSpec.name}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[8px] uppercase font-sans">class (Widget Class):</span>
                  <span className="text-emerald-400 break-all">{currentSpec.class}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[8px] uppercase font-sans">resource-id:</span>
                  <span className="text-blue-400 break-all">{currentSpec.resourceId}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[8px] uppercase font-sans">XPATH Selector:</span>
                  <span className="text-teal-400 break-all">{currentSpec.xpath}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-stone-500 block text-[8px] uppercase font-sans">clickable:</span>
                    <span className="bg-neutral-800 px-1 font-bold text-[8px]">{currentSpec.clickable}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[8px] uppercase font-sans">bounds (coordinate):</span>
                    <span className="text-zinc-500 text-[8px] font-mono">{currentSpec.bounds}</span>
                  </div>
                </div>
              </div>
            ) : (
              // Code View showing text-entry.e2e.ts
              <pre className="text-[8px] text-zinc-300 overflow-auto max-h-[200px] leading-tight select-text scrollbar-thin">
{`describe("APIDemos Text Entry Dialog", () => {
  it("should input name and password and verify", async () => {
    // klik App menu item
    const appMenu = await $('android=new UiSelector().text("App")');
    await appMenu.click();

    // klik Alert Dialogs menu item
    const alertDialogs = await $(
      'android=new UiSelector().text("Alert Dialogs")'
    );
    await alertDialogs.click();

    // klik Text Entry dialog button
    const textEntry = await $(
      'android=new UiSelector().text("Text Entry dialog")'
    );
    await textEntry.click();

    // input name
    const nameField = await $("id=io.appium.android.apis:id/username_edit");
    await nameField.setValue("Weni");
    await expect(nameField).toHaveText("Weni");

    // input password
    const passwordField = await $("id=io.appium.android.apis:id/password_edit");
    await passwordField.setValue("12345");
    await expect(passwordField).toBeDisplayed();

    // klik OK
    const okButton = await $("id=android:id/button1");
    await okButton.click();
  });
});`}
              </pre>
            )}
          </div>

          <div className="mt-4 pt-2 border-t border-neutral-800 flex items-start gap-1 text-[8px] leading-relaxed text-zinc-500">
            <AlertCircle size={10} className="shrink-0 text-[#ff8000] mt-0.5" />
            <span>{panelView === 'INSPECTOR' ? 'Tip: Ketuk elemen dialog Alert pada ponsel virtual di kiri untuk melihat parameter penunjuk node Appium.' : 'Tip: Kode ini asinkron, menggunakan await untuk menjamin sinkronisasi proses tap pada device.'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
