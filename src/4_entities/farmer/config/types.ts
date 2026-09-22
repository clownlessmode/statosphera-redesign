export interface RequestDto {
  idUser: number;
  organizationName: string;
  managerName: string;
  phoneOrganization: string;
  emailOrganization: string;
  inn: string[];
  kpp: string[];
  nds: string;
  bankDetails: string;
  legalAddress: string;
  postalAddress: string;
  workshopAddress: string;
  ogrn: string;
  okpo: string;
  okved: string;
  chiefAccountant: string;
  companyHistory: string | null;
  declarations: {
    idDeclarations: number;
    nameDeclaration: string;
    dateEndDeclaration: string | null;
    photoDeclaration?: string;
  }[];
  startDateOfCooperation: string | null;
  dateOfFirstDelivery: string | null;
  additionalContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
}

export interface RequestDtoPhoto {
  photo: File;
  idDeclaration?: number;
}

export interface RequestDtoKmContacts {
  idUser: number;
  contacts: {
    name: string;
    phone: string;
    email: string;
    position: string;
  }[];
}

export interface ProfileResponse {
  idUser: string;
  organizationName: string;
  phoneOrganization: string;
  emailOrganization: string;
  legalAddress: string;
  workshopAddress: string;
  inn: string[];
  nds: string;
  bankDetails: string;
  postalAddress: string;
  ogrn: string;
  okpo: string;
  okved: string;
  managerName: string;
  chiefAccountant: string;
  startDateOfCooperation?: string;
  dateOfFirstDelivery?: string;
  photo?: string;
  companyHistory?: string;
  kpp: string[];
  additionalContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
  declarations: {
    idDeclarations: number;
    nameDeclaration: string;
    dateEndDeclaration: string | null;
    photoDeclaration: string | null;
  }[];
  kmContacts: {
    name: string;
    email: string;
    phone: string;
    position: string;
  }[];
  agreementUrl: string;
}

export interface FarmerApplication {
  itemId: string;
  technical_task: string;
  stageId: string;
  updatedTime: string;
  bitrixSyncedAt: string;
  stageKey: string;
  stageName: string;
}

export interface FarmerApplicationResponse {
  items: FarmerApplication[];
  hasMore: boolean;
}

export type FarmerTastingResult = "approved" | "rejected" | "needsRevision";

export type FarmerDataCheckStatus = "approved" | "needsRevision" | "rejected";

export interface FarmerApplicationCommon {
  item_id: string;
  title: string | null;
  created_time: string | null;
  updated_time: string | null;
  moved_time: string | null;
  technical_task: string | null;
  responsible_phone: string | null;
  working_name: string | null;
  marketing_name: string | null;
  stage_number: number | null;
  stage_name: string | null;
  isRevision: boolean;
}

export interface FarmerApplicationSampleStage {
  mvp_desired_development_date: string | null;
  farmer_sample_ready_date: string | null;
  farmer_mvp_readiness: string | null;
}

export interface FarmerApplicationTastingStage {
  tasting_result: FarmerTastingResult | null;
  tasting_feedback: string | null;
  tasting_product_url: string | null;
  ko_feedback_qr_file_urls: string[] | null;
  farmer_product_revision_readiness: string | null;
  novelty_example_public_url: string | null;
}

export interface FarmerApplicationNormativeStage {
  declaration_product_name: string | null;
  product_unit: string | null;
  shelf_life_days: number | null;
  shipment_quant: number | null;
  vat_percent: number | null;
  shipping_from: string | null;
  protein: string | null;
  fat: number | null;
  carbohydrates: number | null;
  calories: number | null;
  composition: string | null;
  storage_conditions_label: string | null;
  mercury_controlled_product: string | null;
  mercury_nomenclature_guid: string | null;
  tnved_code: string | null;
  okpd2_code: string | null;
  chz_marking_type: string | null;
  gtin: string | null;
  group_gtin: string | null;
  test_protocol_url: string | null;
  consumption_restrictions: string | null;
  allergens: string | null;
  cooking_method: string | null;
  usp: string | null;
  supplier_region: string | null;
  mobius_loop: string | null;
  from_farmer: string | null;
  normative_document: string | null;
  kj: string | null;
  package_photo_file_urls: string[] | null;
  declaration_url: string | null;
  gross_weight: string | null;
  net_weight: string | null;
}

export interface FarmerApplicationDocumentsCheckStage {
  farmer_data_check_status: FarmerDataCheckStatus | null;
  nd_check_feedback: string | null;
  name_check_date: string | null;
  marketing_name_check_file_urls: string[] | null;
  working_name_check_file_urls: string[] | null;
  declaration_name_check_result_url: string | null;
}

export interface FarmerApplicationDocumentsRevisionStage {
  farmer_data_check_status: FarmerDataCheckStatus | null;
  nd_check_feedback: string | null;
  farmer_nd_revision_readiness: string | null;
  purchase_price: number | null;
  final_shelf_price: number | null;
}

export interface FarmerApplicationPriceStage {
  purchase_price: number | null;
  final_shelf_price: number | null;
}

export interface FarmerApplicationLabelDesignStage {
  label_size: string | null;
  label_package_raw_volume: string | null;
  approved_label_design_url: string | null;
}

export interface FarmerApplicationLabelApprovalStage {
  approved_label_design_url: string | null;
  design_layout_approval_status: string | null;
  approved_delivery_date: string | null;
}

export interface FarmerApplicationDistributionStage {
  delivery_schedule: string | null;
  rc_delivery_schedule_approval_status: string | null;
  approved_delivery_date: string | null;
  planned_launch_date: string | null;
}

export interface FarmerApplicationLaunchStage {
  planned_launch_date: string | null;
}

export interface FarmerApplicationDetail {
  common: FarmerApplicationCommon;
  stage_UC_HRKJ5S: FarmerApplicationSampleStage;
  stage_NEW: FarmerApplicationTastingStage;
  stage_UC_XA4NH4: FarmerApplicationTastingStage;
  stage_UC_1B20Z0: FarmerApplicationNormativeStage;
  stage_UC_C8Z9PM: FarmerApplicationDocumentsCheckStage;
  stage_UC_21AWKG: FarmerApplicationDocumentsRevisionStage;
  stage_UC_70T9OA: FarmerApplicationDocumentsRevisionStage;
  stage_UC_2JOKXY: FarmerApplicationPriceStage;
  stage_UC_ICBDGO: FarmerApplicationLabelDesignStage;
  stage_UC_1BO6E2: FarmerApplicationLabelApprovalStage;
  stage_UC_4R5U06: FarmerApplicationDistributionStage;
  stage_FAIL: Record<string, never>;
  stage_SUCCESS: FarmerApplicationLaunchStage;
}
