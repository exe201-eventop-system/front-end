import { motion } from "framer-motion"
import { featuredCategories } from "../../../data/home"

const Categories = () => {
    return <>
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Danh Mục Nổi Bật</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
                    {featuredCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors cursor-pointer"
                        >
                            <div className="text-4xl mb-2">{category.icon}</div>
                            <h3 className="font-semibold mb-1">{category.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    </>
}
export default Categories