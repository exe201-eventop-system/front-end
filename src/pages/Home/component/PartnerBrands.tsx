import { motion } from "framer-motion";
import { partnerBrands } from "../../../data/home";

const PartnerBrands = () => {

    return <>
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Đối Tác Của Chúng Tôi</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {partnerBrands.map((brand, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-w-full h-auto"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    </>
}
export default PartnerBrands;