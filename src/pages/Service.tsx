import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Service: React.FC = () => {
    // Assuming service is defined in the component's state or props
    const service = {
        supplier: {
            id: '1',
            name: 'Supplier Name'
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Building2 className="text-purple-500" size={20} />
            <Link to={`/supplier/${service.supplier.id}`} className="text-purple-600 hover:text-purple-800">
                {service.supplier.name}
            </Link>
        </div>
    );
};

export default Service; 