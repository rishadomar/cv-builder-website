import { EducationEntry, WorkExperienceEntry } from '../type';

export const compareWorkExperienceEntries = (a: WorkExperienceEntry, b: WorkExperienceEntry) => {
    if (a.startDate && b.startDate) {
        if (a.startDate.year > b.startDate.year) {
            return -1;
        } else if (a.startDate.year < b.startDate.year) {
            return 1;
        } else {
            if (a.startDate.month > b.startDate.month) {
                return -1;
            } else if (a.startDate.month < b.startDate.month) {
                return 1;
            }
        }
    }
    return 0;
};

export const compareEducationEntries = (a: EducationEntry, b: EducationEntry) => {
    if (a.graduationDate && b.graduationDate) {
        if (a.graduationDate.year > b.graduationDate.year) {
            return -1;
        } else if (a.graduationDate.year < b.graduationDate.year) {
            return 1;
        } else {
            if (a.graduationDate.month > b.graduationDate.month) {
                return -1;
            } else if (a.graduationDate.month < b.graduationDate.month) {
                return 1;
            }
        }
    }
    return 0;
};
