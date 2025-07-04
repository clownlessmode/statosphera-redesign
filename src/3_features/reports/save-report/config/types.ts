export interface SaveReportFormData {
  reportName: string;
}

export interface SaveReportModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
