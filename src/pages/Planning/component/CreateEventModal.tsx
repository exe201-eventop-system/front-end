import React, { useState } from "react";
import BaseModal from "../../../components/BaseModal";
import { useDispatch } from 'react-redux';
import Button from "../../../components/Button";
import { PlaningStep1Request } from "../../../types/Planning.type";
import { createPlanningStep1 } from '../../../features/Planning/planningThunks';
import { AppDispatch } from '../../../features/store';
import { getPlanning } from '../../../features/Planning/planningThunks';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     await dispatch(createPlanningStep1(data)).unwrap();
      onClose();
      // Reset form
      setEventName("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Tạo Sự Kiện Mới">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div className="space-y-2">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
            Tên sự kiện
          </label>
          <input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Nhập tên sự kiện"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            id="description"
            placeholder="Mô tả chi tiết về sự kiện"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Hủy
          </button>
          <Button
            typeButon="submit"
            isActive={true}
          >
            Tạo sự kiện
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CreateEventModal;
