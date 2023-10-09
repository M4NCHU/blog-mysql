"use client";

import { CSSProperties } from "react";

function CustomCodeRenderer({ data }: any) {
  data;

  const codeStyle: CSSProperties = {
    whiteSpace: "pre-wrap", // Ta właściwość spowoduje zawijanie wierszy w znaczniku <code>
  };

  return (
    <pre className="bg-gray-800 rounded-md p-4 my-2">
      <code className="text-gray-100 text-sm break-words" style={codeStyle}>
        {data.code}
      </code>
    </pre>
  );
}

export default CustomCodeRenderer;
