/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Download, Eye, Grid, Layers, Shield, Square } from 'lucide-react';

type BackdropMode = 'checker' | 'dark' | 'olive' | 'light';
type ViewMode = 'single' | 'grid';

interface RoleSpec {
  id: string;
  name: string;
  gear: string;
  imageUrl: string;
  filename: string;
}

const ROLES: RoleSpec[] = [
  {
    id: 'francotirador',
    name: 'Francotirador',
    gear: 'Capucha ghillie con flecos oliva/caqui, rostro semicubierto, fusil con mira',
    imageUrl: '/portraits/francotirador.png',
    filename: 'francotirador_512x512.png',
  },
  {
    id: 'artillero',
    name: 'Artillero',
    gear: 'Casco de comunicaciones con antena y micrófono, cartucheras',
    imageUrl: '/portraits/artillero.png',
    filename: 'artillero_512x512.png',
  },
  {
    id: 'espia',
    name: 'Espía',
    gear: 'Capucha oscura, gafas tácticas y cuello alto',
    imageUrl: '/portraits/espia.png',
    filename: 'espia_512x512.png',
  },
  {
    id: 'medico',
    name: 'Médico',
    gear: 'Casco blanco con cruz roja y mochila sanitaria',
    imageUrl: '/portraits/medico.png',
    filename: 'medico_512x512.png',
  },
  {
    id: 'ingeniero',
    name: 'Ingeniero',
    gear: 'Casco amarillo de obra, bigote y arnés de herramientas',
    imageUrl: '/portraits/ingeniero.png',
    filename: 'ingeniero_512x512.png',
  },
  {
    id: 'comando',
    name: 'Comando',
    gear: 'Gorra táctica, chaleco blindado y cartucheras',
    imageUrl: '/portraits/comando.png',
    filename: 'comando_512x512.png',
  },
  {
    id: 'capitan',
    name: 'Capitán',
    gear: 'Gorra de plato con galón dorado y charreteras',
    imageUrl: '/portraits/capitan.png',
    filename: 'capitan_512x512.png',
  },
];

const BACKDROPS: { id: BackdropMode; label: string; className: string }[] = [
  { id: 'checker', label: 'Transparente', className: 'bg-checkerboard' },
  { id: 'dark', label: 'Oscuro', className: 'bg-[#161917]' },
  { id: 'olive', label: 'Oliva', className: 'bg-[#3d4637]' },
  { id: 'light', label: 'Claro', className: 'bg-[#ecebe4]' },
];

export default function App() {
  const [selectedId, setSelectedId] = useState<string>(ROLES[0].id);
  const [backdrop, setBackdrop] = useState<BackdropMode>('checker');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showReference, setShowReference] = useState(false);

  const activeRole = ROLES.find((r) => r.id === selectedId) ?? ROLES[0];
  const currentBackdrop = BACKDROPS.find((b) => b.id === backdrop) ?? BACKDROPS[0];

  return (
    <div className="min-h-screen bg-[#141715] text-[#e7e5dc] flex flex-col selection:bg-[#7d8c66] selection:text-white">
      <header className="border-b border-[#2a2f2b] bg-[#1a1e1b]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#3c4534] border border-[#56634b] flex items-center justify-center text-[#d2dac2]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-[#f0efe8]">
                Retratos de Escuadrón · Estilo 3D RAD Soldiers
              </h1>
              <p className="text-xs text-[#9ca396]">
                7 / 7 roles completados · PNG 512 × 512 px con fondo transparente
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-[#141715] p-1 rounded-lg border border-[#2a2f2b]">
              {BACKDROPS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBackdrop(item.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    backdrop === item.id
                      ? 'bg-[#3c4534] text-white'
                      : 'text-[#9aa195] hover:text-[#e7e5dc]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-[#141715] p-1 rounded-lg border border-[#2a2f2b]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#3c4534] text-white'
                    : 'text-[#9aa195] hover:text-[#e7e5dc]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Escuadrón
              </button>
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  viewMode === 'single'
                    ? 'bg-[#3c4534] text-white'
                    : 'text-[#9aa195] hover:text-[#e7e5dc]'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                Detalle
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowReference((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium bg-[#252a26] hover:bg-[#2f3630] border border-[#3a413b] text-[#d5d8ce] transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              {showReference ? 'Ocultar referencia' : 'Referencia'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
        {showReference && (
          <div className="rounded-xl border border-[#2d332e] bg-[#1a1e1b] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9aa195]">
                Referencia original · RAD Soldiers (2012)
              </span>
              <span className="text-[11px] text-[#7f8a77]">
                Render 3D estilizado, paleta apagada, sombras suaves
              </span>
            </div>
            <img
              src="/assets/aistudio/image_bf240bbd.png"
              alt="Referencia de estilo RAD Soldiers"
              referrerPolicy="no-referrer"
              className="w-full max-h-64 rounded-lg border border-[#2c312d] object-contain bg-[#141715]"
            />
          </div>
        )}

        {viewMode === 'grid' ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLES.map((role, index) => (
              <article
                key={role.id}
                className="rounded-xl border border-[#2d332e] bg-[#1a1e1b] overflow-hidden flex flex-col shadow-lg hover:border-[#4b5b3e] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(role.id);
                    setViewMode('single');
                  }}
                  className={`relative aspect-square w-full flex items-center justify-center p-4 cursor-pointer group ${currentBackdrop.className}`}
                >
                  <img
                    src={role.imageUrl}
                    alt={`Retrato 3D de ${role.name}`}
                    width={512}
                    height={512}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)] group-hover:scale-[1.03] transition-transform"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#141715]/80 text-[#c9d1c2] border border-[#3a413b]">
                    0{index + 1} · 512×512
                  </span>
                </button>

                <div className="p-3.5 border-t border-[#2a2f2b] flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-[#f0efe8]">{role.name}</h2>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#b5c99a]">
                        <Check className="w-3 h-3" />
                        PNG
                      </span>
                    </div>
                    <p className="text-xs text-[#969d90] mt-1 leading-relaxed">
                      {role.gear}
                    </p>
                  </div>

                  <a
                    href={role.imageUrl}
                    download={role.filename}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#3c4534] hover:bg-[#4d5942] text-white border border-[#56634b] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar PNG
                  </a>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <section className="lg:col-span-7">
              <div className="rounded-xl border border-[#2d332e] bg-[#1a1e1b] overflow-hidden shadow-2xl">
                <div className="px-4 py-3 border-b border-[#2a2f2b] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#f0efe8]">
                      {activeRole.name}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#272d28] text-[#aeb6a6] border border-[#363e37]">
                      512×512 PNG
                    </span>
                  </div>

                  <a
                    href={activeRole.imageUrl}
                    download={activeRole.filename}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#5e6e4a] hover:bg-[#6d7f56] text-white border border-[#798d60] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Descargar PNG (512×512)
                  </a>
                </div>

                <div
                  className={`relative aspect-square w-full flex items-center justify-center p-6 transition-colors ${currentBackdrop.className}`}
                >
                  <img
                    src={activeRole.imageUrl}
                    alt={`Retrato de busto 3D de ${activeRole.name} estilo RAD Soldiers`}
                    width={512}
                    height={512}
                    referrerPolicy="no-referrer"
                    className="w-full max-w-[440px] h-auto aspect-square object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.45)]"
                  />
                </div>

                <div className="px-4 py-3 border-t border-[#2a2f2b] bg-[#171a18] flex items-center justify-between text-xs text-[#9aa195]">
                  <span>{activeRole.gear}</span>
                  <span className="font-mono text-[#7f8a77]">RGBA · Alpha limpio</span>
                </div>
              </div>
            </section>

            <aside className="lg:col-span-5">
              <div className="rounded-xl border border-[#2d332e] bg-[#1a1e1b] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-[#93a37e]" />
                  <h2 className="text-sm font-semibold text-[#f0efe8]">
                    Los 7 roles del escuadrón
                  </h2>
                </div>

                <ul className="space-y-2">
                  {ROLES.map((role, index) => {
                    const isSelected = role.id === activeRole.id;
                    return (
                      <li key={role.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(role.id)}
                          className={`w-full text-left rounded-lg border px-3.5 py-2.5 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#283126] border-[#61754f]'
                              : 'bg-[#161917] border-[#262b27] hover:border-[#3c4534]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={role.imageUrl}
                              alt={role.name}
                              width={40}
                              height={40}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded bg-checkerboard object-contain shrink-0 border border-[#2e342f]"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono text-[#868e80]">
                                  0{index + 1}
                                </span>
                                <span className="text-sm font-medium text-[#efede5]">
                                  {role.name}
                                </span>
                              </div>
                              <p className="text-xs text-[#969d90] truncate">
                                {role.gear}
                              </p>
                            </div>
                          </div>

                          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#3b4a2f] text-[#d9e8c8] border border-[#566b44]">
                            <Check className="w-3 h-3" />
                            Listo
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
