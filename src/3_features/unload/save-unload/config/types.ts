export interface SaveUnloadFormData {
  unloadName: string;
}

export interface SaveUnloadModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
