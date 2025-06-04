import { motion } from "framer-motion";
import { whyChooseUs } from "../../../data/home";

const ChooseUs = () => {

    return <>
    <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Tại Sao Chọn Chúng Tôi</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {whyChooseUs.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-purple-50 p-8 rounded-lg text-center hover:bg-purple-100 transition-colors"
          >
            <div className="text-purple-600 mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
    </>
}
export default ChooseUs;