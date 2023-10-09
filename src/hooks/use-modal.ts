import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null); // Przechowuje dane przekazywane do modala

  const openModal = (data?: any) => {
    setIsOpen(true);
    if (data) {
      setModalData(data);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null); // Czyść dane po zamknięciu modala
  };

  const updateModalData = (data: any) => {
    setModalData(data);
  };

  const closeModalOnOutsideClick = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    modalData,
    updateModalData,
    closeModalOnOutsideClick,
  };
};
