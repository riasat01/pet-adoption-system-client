import dog from '../../../../../assets/images/dog1.png';
import cat from '../../../../../assets/images/cat1.png';
import rabbit from '../../../../../assets/images/rabbit1.png';
import fish from '../../../../../assets/images/fish1.png';
import CategoryCard from './CategoryCard';
import SectionTitle from '../../../main-layout-shared-components/section-title/SectionTitle';

const PetCategory = () => {
    const categories = [dog, cat, fish, rabbit];
    const categorieName = ['Dog', 'Cat', 'Fish', 'Rabbit'];
    return (
        <section className='mt-24'>
            <SectionTitle title={'Pet Category'}></SectionTitle>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 md:mx-12 lg:mx-24'>
                {
                    categories?.map((img, i) => <CategoryCard key={i} img={img} name={categorieName[i]}></CategoryCard>)
                }
            </div>
        </section>
    );
};

export default PetCategory;