import { create } from 'zustand';

//hook para gestionar datos de usuario
export const useUserData = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
}));

//Hook para gestionar datos de concurso
export const useConcursoData = create((set) => ({
  concursoData: {}, // Puedes inicializarlo con un objeto vacío o con los datos iniciales que necesites.
  setConcursoData: (data) => set({ concursoData: data }),
}));


