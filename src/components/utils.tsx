export const getAge = 
    (dob: string, startYear = new Date().getFullYear()) => 
    Math.max(0, startYear - new Date(dob).getFullYear() - 
    (new Date(new Date(dob).setFullYear(startYear)) < new Date(dob) ? 1 : 0));