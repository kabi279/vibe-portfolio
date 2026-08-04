// 通用确认弹窗：是否进行兑换？→ 是 / 否
// 支持 Esc 关闭、点击遮罩关闭，键盘可达。
import React, { useEffect } from 'react';
import './ConfirmModal.css';

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = '是',
  cancelText = '否',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div
        className="confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-label={title || '确认'}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="confirm-title">{title}</h3>}
        {message && <p className="confirm-message">{message}</p>}
        <div className="confirm-actions">
          <button type="button" className="confirm-btn confirm-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="confirm-btn confirm-ok" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
