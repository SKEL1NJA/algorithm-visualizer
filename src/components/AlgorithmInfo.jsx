import { algorithmInfo } from "../utils/algorithmInfo";

const AlgorithmInfo = ({ algorithm }) => {

  const info = algorithmInfo[algorithm];

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg mb-6 w-full max-w-4xl">

      <h2 className="text-xl font-bold mb-2">
        {info.name}
      </h2>

      <p className="mb-2">{info.description}</p>

      <div className="flex gap-6 mt-2">
        <span>
          <strong>Time:</strong> {info.time}
        </span>

        <span>
          <strong>Space:</strong> {info.space}
        </span>
      </div>

    </div>
  );
};

export default AlgorithmInfo;