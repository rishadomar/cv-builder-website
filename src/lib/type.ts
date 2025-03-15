import { LucideIcon } from 'lucide-react';
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

export type FieldLayout = 'compact' | 'default';

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

export type TopSkillsAudio = {
    count: number;
    lastUpdated: string;
    status: 'queued' | 'processing' | 'complete' | 'error';
};

export type SocialLinkTypes = 'linkedIn' | 'github' | 'twitter' | 'portfolio';

export type FieldValuesState = {
    sub?: string;
    email?: string;
    name?: string;
    professionalTitle?: string;
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
    personalityTraits?: string[];
    otherTraits?: string;
    personalityText?: string;
    hobbies?: string[];
    hobbiesText?: string;
    otherHobbies?: string;
    educationEntries?: EducationEntry[];
    workExperiences?: WorkExperienceEntry[];
    topSkills?: string;
    topSkillsAudio?: TopSkillsAudio;
    socialLinks?: {
        linkedIn?: string;
        github?: string;
        twitter?: string;
        portfolio?: string;
        primaryLink?: SocialLinkTypes;
    };
    payment?: PaymentDetails;
    pdf_id?: string;
    pdf_generated_date?: string;
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
    year: number;
    month: number;
}

export interface EducationEntry {
    id: number;
    description: string;
    institution: string;
    graduationDate?: YearMonth;
    location: string;
    subjects: string;
    comment: string;
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

export type AvailablePDFTemplates = 'default' | 'professional';

export type StepPath =
    | 'contact-details'
    | 'location-details'
    | 'remote-work-details'
    | 'personality-details'
    | 'hobbies'
    | 'education'
    | 'work-experience'
    | 'top-skills'
    | 'social-links'
    | 'paywall'
    | 'review'
    | 'select-template'
    | 'download-pdf';

export type StepType = {
    id: number;
    title: string;
    icon?: LucideIcon;
    description: string;
    completed: boolean;
    path: StepPath;
    showInSections: boolean;
    paymentRequired: boolean;
};

export interface ApiError {
    status?: number;
    data?: {
        message?: string;
        code?: string;
        errors?: Record<string, string[]>;
    };
}

export type GoogleLoginResponse = {
    access_token: string;
    id_token: string;
    refresh_token: string;
    sub: string;
    email: string;
};

export type LoginResponse = {
    AccessToken: string;
    IdToken: string;
    RefreshToken: string;
    Sub: string;
};

export type RegisterNewUserResponse = {
    sub: string;
    email: string;
};

export type LogoutResponse = {
    message: string;
};

export type BlogPostsResponse = {
    items: BlogPost[];
};

export type BlogPostStatus = 'draft' | 'published';

export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    author: string;
    timestamp: string;
    status: BlogPostStatus;
    keywords?: string[];
};
