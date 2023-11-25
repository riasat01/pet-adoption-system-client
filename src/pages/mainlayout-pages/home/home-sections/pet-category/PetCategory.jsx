import dog from '../../../../../assets/images/dog1.png';
import cat from '../../../../../assets/images/cat1.png';
import rabbit from '../../../../../assets/images/rabbit1.png';
import fish from '../../../../../assets/images/fish1.png';
import CategoryCard from './CategoryCard';

const PetCategory = () => {
    const categories = [dog, cat, fish, rabbit];
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
                categories?.map((img, i) =>  <CategoryCard key={i} img={img}></CategoryCard>)
            }
        </div>
    );
};

export default PetCategory;