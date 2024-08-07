// const dummyUser: DummyUser = {
//   id: "1",
//   name: "John Doe",
//   email: "johndoe@example.com",
// };

import { AllColumn, Payment, TeamMemberColumn, signInProps } from "@/types";

// export const getUserInfo = async () => {};

// export const signIn = async ({ email, password }: signInProps) => {
//   email;
//   password;
// };

// export const signUp = async ({ email, password }: SignUpParams) => {
//   email;
//   password;
// };

// export const getLoggedInUser = async (): Promise<DummyUser | null> => {
//   // Simulate the user being logged out by returning null
//   return null;
// };

// export const logoutAccount = async () => {
//   console.log("logged out");
// };

// user.actions.ts
export type DummyUser = {
  id: string;
  name: string;
  email: string;
};

const dummyUser: DummyUser = {
  id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
};

export const getUserInfo = async () => {};

export const signIn = async ({
  email,
  password,
}: signInProps): Promise<DummyUser | null> => {
  // Mock authentication logic
  if (email === dummyUser.email && password === "password") {
    localStorage.setItem("isLoggedIn", "true");
    return dummyUser;
  }
  return null;
};

export const signUp = async ({
  email,
  firstName,
}: {
  email: string;
  firstName: string;
}): Promise<DummyUser> => {
  // Simulate user creation and return the created user
  return {
    id: "2",
    name: firstName,
    email,
  };
};

export async function getLoggedInUser(): Promise<DummyUser | null> {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    return dummyUser;
  }
  return null;
}

export const logoutAccount = async () => {
  localStorage.removeItem("isLoggedIn");
  console.log("logged out");
};

export async function getData(): Promise<Payment[]> {
  return [
    {
      id: "m5gr84i9",
      amount: 316,
      email: "ken99@yahoo.com",
      serialNumber: 1,
      name: "Ken Smith",
      recommendedSchool: "Harvard University",
      recommendedCourse: "Computer Science",
      resume: "resume_1",
      sop: "sop_1",
      schoolApplicationStarted: "true01",
      schoolApplicationCompleted: "true14",
      status: "not completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      email: "Abe45@gmail.com",
      serialNumber: 2,
      name: "Abe Johnson",
      recommendedSchool: "Stanford University",
      recommendedCourse: "Electrical Engineering",
      resume: "resume_2",
      sop: "sop_2",
      schoolApplicationStarted: "true03",
      schoolApplicationCompleted: "true15",
      status: "completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "derv1ws0",
      amount: 837,
      email: "Monserrat44@gmail.com",
      serialNumber: 3,
      name: "Monserrat Gomez",
      recommendedSchool: "MIT",
      recommendedCourse: "Mechanical Engineering",
      resume: "resume_3",
      sop: "sop_3",
      schoolApplicationStarted: "true05",
      schoolApplicationCompleted: "true16",
      status: "completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "5kma53ae",
      amount: 874,
      email: "Silas22@gmail.com",
      serialNumber: 4,
      name: "Silas Thompson",
      recommendedSchool: "UC Berkeley",
      recommendedCourse: "Data Science",
      resume: "resume_4",
      sop: "sop_4",
      schoolApplicationStarted: "true07",
      schoolApplicationCompleted: "true17",
      status: "not completed",
      phone: "+234 709 823 4343",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      email: "carmella@hotmail.com",
      serialNumber: 5,
      name: "Carmella Lee",
      recommendedSchool: "Princeton University",
      recommendedCourse: "Physics",
      resume: "resume_5",
      sop: "sop_5",
      schoolApplicationStarted: "true09",
      schoolApplicationCompleted: "true18",
      status: "completed",
      phone: "+234 709 823 4343",
    },
  ];
}

export async function getAllData(): Promise<AllColumn[]> {
  return [
    {
      id: "m5gr84i9",
      serialNumber: 1,
      candidateName: "Ken Smith",
      country: "Nigeria",
      assignedUniversity: "Harvard University",
      assignedCourse: "Computer Science",
      schoolApplicationStatus: "true01",
      resumeStatus: "true14",
      sopStatus: "not completed",
      duplicate: "Duplicate",
    },
    {
      id: "b2fg93h1",
      serialNumber: 2,
      candidateName: "Jane Doe",
      country: "Ghana",
      assignedUniversity: "Stanford University",
      assignedCourse: "Mechanical Engineering",
      schoolApplicationStatus: "true05",
      resumeStatus: "true11",
      sopStatus: "completed",
      duplicate: "Not Duplicate",
    },
    {
      id: "c8hx67m4",
      serialNumber: 3,
      candidateName: "John Carter",
      country: "South Africa",
      assignedUniversity: "Massachusetts Institute of Technology",
      assignedCourse: "Electrical Engineering",
      schoolApplicationStatus: "true07",
      resumeStatus: "true10",
      sopStatus: "not completed",
      duplicate: "Duplicate",
    },
    {
      id: "d1kl09n8",
      serialNumber: 4,
      candidateName: "Emily Clark",
      country: "Kenya",
      assignedUniversity: "University of Cambridge",
      assignedCourse: "Chemical Engineering",
      schoolApplicationStatus: "true03",
      resumeStatus: "true13",
      sopStatus: "completed",
      duplicate: "Not Duplicate",
    },
    {
      id: "e4mn23v6",
      serialNumber: 5,
      candidateName: "Michael Brown",
      country: "Uganda",
      assignedUniversity: "University of Oxford",
      assignedCourse: "Civil Engineering",
      schoolApplicationStatus: "true02",
      resumeStatus: "true12",
      sopStatus: "not completed",
      duplicate: "Duplicate",
    },
    {
      id: "f9op45w2",
      serialNumber: 6,
      candidateName: "Sarah Johnson",
      country: "Tanzania",
      assignedUniversity: "California Institute of Technology",
      assignedCourse: "Aerospace Engineering",
      schoolApplicationStatus: "true08",
      resumeStatus: "true09",
      sopStatus: "completed",
      duplicate: "Not Duplicate",
    },
  ];
}

export async function getTeamMembersData(): Promise<TeamMemberColumn[]> {
  return [
    {
      id: "a1b2c3d4",
      fullName: "Alice Johnson",
      staffStatus: "Active",
      assignedCandidates: "15",
      permission: "Admin",
      deleteAccount: "Yes",
    },
    {
      id: "e5f6g7h8",
      fullName: "Bob Smith",
      staffStatus: "Inactive",
      assignedCandidates: "8",
      permission: "Editor",
      deleteAccount: "No",
    },
    {
      id: "i9j0k1l2",
      fullName: "Charlie Brown",
      staffStatus: "Active",
      assignedCandidates: "20",
      permission: "Viewer",
      deleteAccount: "Yes",
    },
    {
      id: "m3n4o5p6",
      fullName: "Diana Prince",
      staffStatus: "Active",
      assignedCandidates: "25",
      permission: "Admin",
      deleteAccount: "No",
    },
    {
      id: "q7r8s9t0",
      fullName: "Ethan Hunt",
      staffStatus: "Inactive",
      assignedCandidates: "5",
      permission: "Editor",
      deleteAccount: "Yes",
    },
    {
      id: "u1v2w3x4",
      fullName: "Fiona Gallagher",
      staffStatus: "Active",
      assignedCandidates: "30",
      permission: "Viewer",
      deleteAccount: "No",
    },
    {
      id: "y5z6a7b8",
      fullName: "George Clooney",
      staffStatus: "Inactive",
      assignedCandidates: "12",
      permission: "Admin",
      deleteAccount: "Yes",
    },
    {
      id: "c9d0e1f2",
      fullName: "Hannah Montana",
      staffStatus: "Active",
      assignedCandidates: "22",
      permission: "Editor",
      deleteAccount: "No",
    },
    {
      id: "g3h4i5j6",
      fullName: "Ian Fleming",
      staffStatus: "Inactive",
      assignedCandidates: "7",
      permission: "Viewer",
      deleteAccount: "Yes",
    },
    {
      id: "k7l8m9n0",
      fullName: "Jill Valentine",
      staffStatus: "Active",
      assignedCandidates: "18",
      permission: "Admin",
      deleteAccount: "No",
    },
  ];
}
