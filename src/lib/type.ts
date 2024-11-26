//import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Currency } from 'react-paystack/dist/types';

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
    currency: Currency;
    amount: number;
    date: string;
    promoCode?: string;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
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
    endDate?: YearMonth;
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

// Define a type for key-value pairs
export interface KeyValuePair {
    key: string;
    value: unknown;
}

// Define a type for an array of key-value pairs
export type KeyValuePairArray = KeyValuePair[];

export type Error = {
    response: {
        data: {
            error: string;
        };
    };
};
