export interface Doctor {
  administrator: boolean;
  doctor_address: string;
  doctor_email: string;
  doctor_image: string;
  doctor_last_name: string;
  doctor_name: string;
  doctor_phone: string;
  profile_image: string;
  user_id: string;
  user_name: string;
  doctor_description: string;
  specialities: Specialities[];
}

export interface Specialities {
  speciality_id: string;
  speciality_name: string;
}

export interface Experience {
  experienceName: string;

}

export interface DoctorRes {
  address: string;
  id: number;
  lastName: string;
  name: string;
  speciality: string;
  image: string;

}
