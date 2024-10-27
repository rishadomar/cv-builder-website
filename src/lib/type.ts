//import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type AuthenticationPayload = {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    sub: string;
    email: string;
};

export type AuthenticationResponse = {
    jwt: string;
};

export type YesNoType = 'yes' | 'no';

export interface Column {
    key: string;
    title: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    onClick?: () => void;
}

export interface Cell {
    key: string;
    value: string;
}

// export interface Action {
//     label: string;
//     icon: IconProp;
//     onClick: () => void;
// }

// export interface Row {
//     cells: Cell[];
//     actions: Action[];
// }

export type PaymentDetails = {
    amount: number;
    date: Date;
};

export type FieldValuesState = {
    sub?: string;
    email?: string;
    name?: string;
    phoneNumber?: string;
    preferredPronoun?: string;
    excludeGender?: YesNoType;
    city?: string;
    country?: string;
    province?: string;
    preparedToRelocate?: YesNoType;
    remoteWork?: YesNoType;
    partiallyRemote?: YesNoType;
    preferRemote?: YesNoType;
    descriptionOfSelf?: string[];
    otherTraits?: string;
    personalityText?: string;
    hobbies?: string[];
    otherHobbies?: string;
    workExperiences?: WorkExperienceEntry[];
    payment?: PaymentDetails;
    pdf_id?: string;
    pdf_url?: string;
};

export interface FieldValue {
    field: keyof FieldValuesState;
    value: unknown;
}

export interface PayloadActionAddItemToList {
    listName: string;
    fieldValues: FieldValue[];
}

export interface YearMonth {
    year: string;
    month: string;
}

export interface WorkExperienceEntry {
    id: number;
    company: string;
    startDate?: YearMonth;
    endDate?: Date;
    location: string;
    role: string;
    description: string;
}

export type CvData = {
    sub: string;
    email: string;
    dateTime?: Date;
};

export type SignupDetails = {
    sub: string;
    email: string;
};
