import React, { useState } from "react";
import BaseModal from "../../../components/BaseModal";
import { useDispatch } from 'react-redux';
import Button from "../../../components/Button";
import { PlaningStep1Request } from "../../../types/Planning.type";
import { createPlanningStep1 } from '../../../features/Planning/planningThunks';
import { AppDispatch } from '../../../features/store';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const data: PlaningStep1Request = {
    name: eventName,
    description,
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPlanningStep1(data))
    onClose();
    setEventName("");
    setDescription("");
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Tạo Sự Kiện Mới">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Tên sự kiện"
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          placeholder="Mô tả"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <Button
            typeButon="submit" isActive={true}
          >
            Lưu
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CreateEventModal;
