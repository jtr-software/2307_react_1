import { useTranslations } from 'next-intl';
import { Popup } from './Popup';

type PrivacyPopupProps = {
  onClose: () => void;
};

export function PopupPrivacy({ onClose }: PrivacyPopupProps) {
  const t = useTranslations('PrivacyPolicy');

  return (
    <Popup onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
      <p className="mb-4 whitespace-pre-line">{t('content')}</p>
    </Popup>
  );
}
