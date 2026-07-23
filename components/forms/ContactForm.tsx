'use client';

import { PrimaryButton } from '@/components/buttons/Button';
import { ConsentCheckbox } from '@/components/forms/ConsentCheckbox';
import { GlassCard } from '@/components/general/GlassCard';
import { useToast } from '@/hooks/use-toast';
import { Control, Field, Label, Message, Root } from '@radix-ui/react-form';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';
import { SectionHeader } from '../pages/SectionTexts';

const inputClass =
  'w-full rounded-xl border border-border bg-background/80 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-[border-color,box-shadow]';

type ContactFormProps = {
  teaser?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  /** Labels for name / email / message fields */
  labels?: {
    name?: string;
    email?: string;
    message?: string;
  };
  /** Validation messages */
  validation?: {
    emailRequired?: string;
    emailInvalid?: string;
  };
  optionalContactDetails?: boolean;
  submissionType?: 'contact' | 'feedback';
};

export function ContactForm({
  teaser = 'Get in Touch',
  title = 'Let us know how we can help',
  description = "Have a question, a partnership idea, or just want to say hello? Fill in the form and we'll get back to you shortly.",
  submitLabel = 'Send Message',
  labels = {},
  validation = {},
  optionalContactDetails = false,
  submissionType = 'contact',
}: ContactFormProps) {
  const t = useTranslations('ContactPage');
  const { toast } = useToast();
  const optionalLabel = optionalContactDetails
    ? ` (${t('form.optional')})`
    : '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentChecked) {
      setShowConsentError(true);
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submissionType }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: t('toast.success.title'),
          description: t('toast.success.description'),
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast({
          title: t('toast.error.title'),
          description: result.message || t('toast.error.description'),
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t('toast.error.title'),
        description: 'Network error. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <GlassCard
      className="p-10 md:p-14 w-full max-w-xl mx-auto text-left"
      glowClassName="w-[300px] h-[160px]"
    >
      <div className="text-center mb-8">
        <Mail className="text-primary mx-auto mb-4" size={20} />
        <SectionHeader teaser={teaser} description={description}>
          {title}
        </SectionHeader>
      </div>

      <Root onSubmit={handleSubmit} className="space-y-4">
        <Field name="name">
          <Label className="mb-1.5 block text-sm font-medium text-foreground/80">
            <span>{labels.name ?? t('form.labels.name')}</span>
            {optionalLabel ? (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {optionalLabel}
              </span>
            ) : null}
          </Label>
          <Control asChild>
            <input
              id="name"
              name="name"
              placeholder={t('form.placeholders.name')}
              value={formData.name}
              onChange={handleChange}
              required={!optionalContactDetails}
              disabled={isLoading}
              className={inputClass}
            />
          </Control>
        </Field>

        <Field name="email">
          <Label className="mb-1.5 block text-sm font-medium text-foreground/80">
            <span>{labels.email ?? t('form.labels.email')}</span>
            {optionalLabel ? (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {optionalLabel}
              </span>
            ) : null}
          </Label>
          <Control asChild>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={t('form.placeholders.email')}
              value={formData.email}
              onChange={handleChange}
              required={!optionalContactDetails}
              disabled={isLoading}
              className={inputClass}
            />
          </Control>
          <Message
            match="valueMissing"
            className="text-xs text-destructive mt-1"
          >
            {validation.emailRequired ?? t('form.validation.emailRequired')}
          </Message>
          <Message
            match="typeMismatch"
            className="text-xs text-destructive mt-1"
          >
            {validation.emailInvalid ?? t('form.validation.emailInvalid')}
          </Message>
        </Field>

        <Field name="message">
          <Label className="block text-sm font-medium mb-1.5 text-foreground/80">
            {labels.message ?? t('form.labels.message')}
          </Label>
          <Control asChild>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t('form.placeholders.message')}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={inputClass + ' resize-none'}
            />
          </Control>
        </Field>

        <ConsentCheckbox
          checked={consentChecked}
          onChange={(v) => {
            setConsentChecked(v);
            if (v) setShowConsentError(false);
          }}
          showError={showConsentError}
        />

        <PrimaryButton
          type="submit"
          disabled={isLoading}
          className="w-full mt-2"
        >
          <Mail size={16} />
          {isLoading ? t('form.sending') : submitLabel}
        </PrimaryButton>
      </Root>
    </GlassCard>
  );
}
