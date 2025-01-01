interface CityCardProps {
  name: string;
  image: string;
  onClick: () => void;
}

export function CityCard({ name, image, onClick }: CityCardProps) {
  return (
    <div 
      onClick={onClick}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
    >
      <img 
        src={image} 
        alt={name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <h3 className="text-white text-xl font-bold p-4">{name}</h3>
      </div>
    </div>
  );
}