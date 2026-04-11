'use client';
import { useWindowStore } from '@/modules/windows/store/useWindowStore';
import { folders } from '@/modules/content/data/folders';

export function Sidebar() {
  const openFolder = useWindowStore((s) => s.openFolder);

  return (
    <div className="w-[170px] min-w-[170px] max-lg:hidden overflow-y-auto p-2 border-r border-[#aca899]"
      style={{ background: 'linear-gradient(180deg, #6b98d1, #4f7bbe 40%, #3b6aad)' }}>
      <div className="rounded-md overflow-hidden mb-1.5" style={{ background: 'linear-gradient(180deg, #fff, #d6dfe8)' }}>
        <div className="text-[11px] font-bold text-[#21458b] px-2 py-1.5"
          style={{ background: 'linear-gradient(180deg, #fff, #c6d3e3)', borderBottom: '1px solid #b9c9dd' }}>
          Navigation
        </div>
        {Object.values(folders).map((f) => (
          <div
            key={f.id}
            onClick={() => openFolder(f.id)}
            className="text-[11px] text-[#215dc6] px-2 py-0.5 cursor-pointer hover:underline"
          >
            {f.title}
          </div>
        ))}
      </div>
    </div>
  );
}
