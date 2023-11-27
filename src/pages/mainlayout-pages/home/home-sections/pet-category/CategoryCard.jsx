

const CategoryCard = ({img}) => {
    return (
        <div style={{
            backgroundImage: `url(${img}), linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover'
        }} 
        className="h-[40vh] rounded-xl">
            
        </div>
    );
};

export default CategoryCard;