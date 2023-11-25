

const CategoryCard = ({img}) => {
    return (
        <div style={{
            backgroundImage: `url(${img}), linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover'
        }} 
        className="h-[40vh] mt-12 md:mt-24 rounded-xl">
            
        </div>
    );
};

export default CategoryCard;