'use client';
import styles from '../styles/Titlebar.module.css';
import clsx from 'clsx';

interface TitlebarProps {
  title: string;
  variant?: 'folder' | 'dark';
  isMaximized?: boolean;
  isActive?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export function Titlebar({
  title, variant = 'folder', isMaximized = false, isActive = true,
  onMinimize, onMaximize, onClose, onMouseDown,
}: TitlebarProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={clsx(styles.titlebar, {
        [styles.inactive]: !isActive && !isDark,
        [styles.dark]: isDark,
        [styles.maximized]: isMaximized && isDark,
      })}
      onMouseDown={onMouseDown}
    >
      {!isDark && (
        <svg width="16" height="16" viewBox="0 0 16 16" className="mr-1 shrink-0">
          <rect x="1" y="3" width="14" height="11" rx="1" fill="#ffd94e" stroke="#b88014" strokeWidth=".5" />
        </svg>
      )}
      <span className={styles.title}>{title}</span>
      <div className={styles.buttons}>
        {onMinimize && (
          <button className={clsx(styles.btn, styles.btnMin)} onClick={onMinimize}>
            <svg width="11" height="11" viewBox="0 0 11 11"><rect x="2" y="8" width="7" height="2" fill={isDark ? '#aaa' : '#fff'} /></svg>
          </button>
        )}
        {onMaximize && (
          <button className={clsx(styles.btn, styles.btnMax)} onClick={onMaximize}>
            <svg width="11" height="11" viewBox="0 0 11 11"><rect x="1" y="1" width="9" height="9" fill="none" stroke={isDark ? '#aaa' : '#fff'} strokeWidth="1.5" /></svg>
          </button>
        )}
        <button className={clsx(styles.btn, styles.btnClose)} onClick={onClose}>
          <svg width="11" height="11" viewBox="0 0 11 11">
            <line x1="2" y1="2" x2="9" y2="9" stroke="#fff" strokeWidth="2" />
            <line x1="9" y1="2" x2="2" y2="9" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
