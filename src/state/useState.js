import { create } from 'zustand';

//hook para gestionar datos de usuario
export const useUserData = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
}));

//Hook para gestionar datos de concurso
export const useConcursoData = create((set) => ({
  concursoData: null, // Puedes inicializarlo con un objeto vacío o con los datos iniciales que necesites.
  setConcursoData: (data) => set({ concursoData: data }),
  clearConcursoData: () => set({ concursoData: null })
}));

// export const useDocumentoData = create((set) => ({
//   documentos: [], // Puedes inicializarlo con un array vacío o con los datos iniciales que necesites.
//   agregarDocumento: (documento) => set((state) => ({ documentos: [...state.documentos, documento] })),
//   eliminarDocumento: (index) => set((state) => ({ documentos: state.documentos.filter((_, i) => i !== index) })),
//   limpiarDocumentos: () => set({ documentos: [] }),
// }));

