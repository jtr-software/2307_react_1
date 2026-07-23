;

import { PopupPrivacy } from '@/components/popups/PopupPrivacy';
import { PopupTermsOfService } from '@/components/popups/PopupTermsOfService';
import { useTranslations } from 'next-intl';
type ConsentCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Shows the validation hint when true and checkbox is unchecked */
  showError?: boolean;
};

export function ConsentCheckbox({
  checked,
  onChange,
  showError,
}: ConsentCheckboxProps) {
  const t = useTranslations('ConsentCheckbox');
  const [openPopup, setOpenPopup] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="text-left">
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border border-border bg-background/80 accent-primary cursor-pointer"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">
          {t.rich('label', {
            privacyLink: (chunks) => (
              <button
                type="button"
                onClick={() => setOpenPopup('privacy')}
                className="underline text-foreground/80 hover:text-primary transition-colors"
              >
                {chunks}
              </button>
            ),
            termsLink: (chunks) => (
              <button
                type="button"
                onClick={() => setOpenPopup('terms')}
                className="underline text-foreground/80 hover:text-primary transition-colors"
              >
                {chunks}
              </button>
            ),
          })}
        </span>
      </label>

      {showError && !checked && (
        <p className="mt-1.5 text-xs text-red-400">{t('required')}</p>
      )}

      {openPopup === 'privacy' && (
        <PopupPrivacy onClose={() => setOpenPopup(null)} />
      )}
      {openPopup === 'terms' && (
        <PopupTermsOfService onClose={() => setOpenPopup(null)} />
      )}
    </div>
  );
}
