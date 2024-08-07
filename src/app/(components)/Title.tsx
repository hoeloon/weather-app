type Props = { title: string };

const Title = ({ title }: Props) => {
  return (
    <h2 className="text-lg font-semibold mb-2 px-5 pt-3 text-gray-900">
      {title}
    </h2>
  );
};

export default Title;
