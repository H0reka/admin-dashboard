import React from "react";
// import {FaCircle} from '@heroicons/react/fa'
const Table = () => {
  const data = [
    {
      id: 43,
      category: {
        id: 5,
        name: "Dairy",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/81bbe2cd-2d80-406b-82f2-f7c3f66b5473.jpeg",
        deleted: false,
      },
      brand: "Britannia",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 3,
        name: "Chiller",
        description: "Coke Fridge",
        isDeleted: true,
      },
      unitQuantity: 1,
      imageUrls: [
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/f7f7119f-d042-4c4b-bef8-5e6670b56066.jpeg",
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/5910a3b4-be97-4333-8f67-8b79b049b1bb.jpeg",
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/8858abf5-a744-4ad4-8a56-273af533f967.jpeg",
      ],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 12,
          bulkCalculatedPrice: 470.25,
        },
      ],
      name: "Britannia - Cheese, Block, 1 Kg",
      description:
        '"Type: Processed cheese\nTexture: Smooth and firm\nUses: Ideal for grating, slicing, and melting"',
      gstPercentage: 12.0,
      hsnCode: "4063000",
      returnWindow: "12",
      priceFormula: 1.11,
      mrp: 591.0,
      purchasePrice: 426.36,
      moq: 1,
      moqSalePrice: 475.0,
      discount: 0.0,
      createdAt: null,
      updatedAt: "2024-12-19T22:25:57.521329",
      chickenMultiplier: 1.0,
      nonVeg: false,
      deleted: false,
      inactive: false,
    },
    {
      id: 47,
      category: {
        id: 5,
        name: "Dairy",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/81bbe2cd-2d80-406b-82f2-f7c3f66b5473.jpeg",
        deleted: false,
      },
      brand: "Britannia",
      unit: {
        id: 6,
        name: "Pkt",
        description: "Packet",
        isDeleted: false,
      },
      storageType: {
        id: 3,
        name: "Chiller",
        description: "Coke Fridge",
        isDeleted: true,
      },
      unitQuantity: 1,
      imageUrls: [
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/38e9bb15-ebb9-4e94-88fb-c6dbd6a6faa7.jpeg",
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/021d2903-0fea-4f31-881d-85b077ff01a6.jpeg",
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/ae713391-3ad6-40d3-9745-57164abe63fc.jpeg",
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/d238ea8d-44b1-47a7-923a-cdff65ec8c6e.jpeg",
      ],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 12,
          bulkCalculatedPrice: 355.41,
        },
      ],
      name: "Britannia - Cheese Slices, 51 Slices",
      description:
        '"Quantity: 51 slices/pack\nType: Processed cheese slices\nUsage: Ideal for burgers, sandwiches, and quick meals\nPackaging: Hygienic and easy-to-use pack"',
      gstPercentage: 12.0,
      hsnCode: "4063000",
      returnWindow: "12",
      priceFormula: 1.11,
      mrp: 510.0,
      purchasePrice: 323.34,
      moq: 1,
      moqSalePrice: 359.0,
      discount: 1.0,
      createdAt: null,
      updatedAt: "2024-12-18T19:35:38.899299",
      chickenMultiplier: 1.0,
      nonVeg: false,
      deleted: false,
      inactive: false,
    },
    {
      id: 86,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chilled Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 10,
          bulkCalculatedPrice: 159.34,
        },
      ],
      name: "Chicken - Biryani Cut (45-55 gm pcs), Bulk Pack",
      description:
        '"Cut Type: Without skin, ideal biryani-sized chicken pieces.\nQuality: Mix grade, may include bone-in and bone-off.\nUsage: Suitable for biryani preparation in bulk."',
      gstPercentage: 0.0,
      hsnCode: "2071100",
      returnWindow: "0",
      priceFormula: 1.0,
      mrp: 1.0,
      purchasePrice: 1.0,
      moq: 1,
      moqSalePrice: 160.95,
      discount: 1.0,
      createdAt: null,
      updatedAt: "2024-12-18T10:30:43.442277",
      chickenMultiplier: 1.85,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
    {
      id: 68,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chilled Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [
        "https://horeka-images.s3.ap-south-1.amazonaws.com/products/ff431528-4dba-4a59-98cb-843aba71802c.jpeg",
      ],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 12,
          bulkCalculatedPrice: 202.41,
        },
      ],
      name: "Chicken - Breast Boneless without Skin, Bulk Pack",
      description:
        '"Mix of medium-large sized pieces.\nMay contain slight fat traces.\nFresh and hygienically packed."',
      gstPercentage: 0.0,
      hsnCode: "2071300",
      returnWindow: "0",
      priceFormula: 1.0,
      mrp: 1.0,
      purchasePrice: 1.0,
      moq: 1,
      moqSalePrice: 204.45,
      discount: 1.0,
      createdAt: null,
      updatedAt: "2024-12-18T10:27:35.786021",
      chickenMultiplier: 2.35,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
    {
      id: 82,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chilled Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 25,
          bulkCalculatedPrice: 155.03,
        },
      ],
      name: "Chicken - Curry Cut Skinout (25-35 gm pcs), Bulk Pack",
      description:
        '"Pieces: 25-35 gm per piece\nCut Type: without skin\nIdeal for: B2B businesses, bulk consumption"',
      gstPercentage: 0.0,
      hsnCode: "2071100",
      returnWindow: "0",
      priceFormula: 1.0,
      mrp: 1.0,
      purchasePrice: 1.0,
      moq: 1,
      moqSalePrice: 156.6,
      discount: 0.0,
      createdAt: null,
      updatedAt: "2024-12-18T10:39:57.373672",
      chickenMultiplier: 1.8,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
    {
      id: 74,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chilled Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 5,
          bulkCalculatedPrice: 172.26,
        },
      ],
      name: "Chicken - Drumstick (Tangadi), Bulk Pack",
      description:
        '"Product: Chicken Drumstick (Tangadi)\nGrade: Mix\nSize: Varies\nPackaging: Bulk for business use"',
      gstPercentage: 0.0,
      hsnCode: "2071300",
      returnWindow: "0",
      priceFormula: 1.0,
      mrp: 1.0,
      purchasePrice: 1.0,
      moq: 1,
      moqSalePrice: 174.0,
      discount: 0.0,
      createdAt: null,
      updatedAt: "2024-12-18T14:26:19.075484",
      chickenMultiplier: 2.0,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
    {
      id: 92,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 10,
          bulkCalculatedPrice: 159.34,
        },
      ],
      name: "Chicken - Kabab Cut (20-25 gm pcs), Bulk Pack",
      description:
        '"Cut Type: Ready kabab cut\nQuality: Fresh, mix grade\nConsistency: Varying piece sizes\nUse: Ideal for bulk preparations"',
      gstPercentage: 0.0,
      hsnCode: "2071100",
      returnWindow: "0",
      priceFormula: 1.0,
      mrp: 1.0,
      purchasePrice: 1.0,
      moq: 1,
      moqSalePrice: 160.95,
      discount: 0.0,
      createdAt: "2024-12-18T10:32:41.311796",
      updatedAt: "2024-12-18T10:33:03.574228",
      chickenMultiplier: 1.85,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
    {
      id: 73,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chilled Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 3,
          bulkCalculatedPrice: 211.02,
        },
      ],
      name: "Chicken - Keema (Mince), Bulk Pack",
      description:
        '"Uniform texture\nMay contain small fat particles\nIdeal for bulk preparation"',
      gstPercentage: 0.0,
      hsnCode: "2071300",
      returnWindow: "0",
      priceFormula: 1.1,
      mrp: 10.0,
      purchasePrice: 10.0,
      moq: 10,
      moqSalePrice: 213.15,
      discount: 0.0,
      createdAt: null,
      updatedAt: "2024-12-18T10:34:11.928863",
      chickenMultiplier: 2.45,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
    {
      id: 71,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chilled Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [],
      bulkDetails: [
        {
          bulkPriceFormula: 1.0,
          minBulkQuantity: 10,
          bulkCalculatedPrice: 208.8,
        },
      ],
      name: "Chicken - Leg Boneless, Bulk Pack",
      description:
        '"Pack Size: Bulk pack (1kg+)\nGrade: Premium quality\nCut: Boneless legs\nPackaging: Suitable for business consumption"',
      gstPercentage: 0.0,
      hsnCode: "2071300",
      returnWindow: "0",
      priceFormula: 1.0,
      mrp: 1.0,
      purchasePrice: 1.0,
      moq: 1,
      moqSalePrice: 208.8,
      discount: 0.0,
      createdAt: null,
      updatedAt: "2024-12-18T14:33:45.261374",
      chickenMultiplier: 2.4,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
    {
      id: 78,
      category: {
        id: 8,
        name: "Chilled Chicken",
        imageUrl:
          "https://horeka-images.s3.ap-south-1.amazonaws.com/categories/dcc6c276-765d-4989-ba0f-7686fff88a45.jpeg",
        deleted: false,
      },
      brand: "Fresh Chilled Chicken",
      unit: {
        id: 1,
        name: "KG",
        description: "kilograms",
        isDeleted: false,
      },
      storageType: {
        id: 5,
        name: "-4C : Deep Fridge",
        description: ".",
        isDeleted: false,
      },
      unitQuantity: 1,
      imageUrls: [],
      bulkDetails: [
        {
          bulkPriceFormula: 0.99,
          minBulkQuantity: 10,
          bulkCalculatedPrice: 180.87,
        },
      ],
      name: "Chicken - Lolipop, Bulk Pack",
      description:
        '"Approx. 16-20 pcs/kg\nFresh and ready for cooking\nMix of medium and large sizes\nBone-in chicken wings trimmed for lollipop style\nSuitable for restaurants and catering services"',
      gstPercentage: 0.0,
      hsnCode: "2071300",
      returnWindow: "0",
      priceFormula: 1.0,
      mrp: 1.0,
      purchasePrice: 1.0,
      moq: 1,
      moqSalePrice: 182.7,
      discount: 0.0,
      createdAt: null,
      updatedAt: "2024-12-18T10:34:59.037961",
      chickenMultiplier: 2.1,
      nonVeg: true,
      deleted: false,
      inactive: false,
    },
  ];
  return (
    <div className="mt-40 flex flex-col justify-center h-[23em] md:h-[35em] lg:h-[23em] relative overflow-hidden">
  <div className="overflow-hidden">
    <table className="border-collapse w-full">
      <thead className="bg-indigo-600">
        <tr>
          <th className="px-4 py-2 w-52">Image</th>
          <th className="px-4 py-2 w-2/6 border-2">Product</th>
          <th className="px-4 py-2">MRP</th>
          <th className="px-4 py-2">MOQ</th>
          <th className="px-4 py-2">Late/Urgent</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
    </table>
  </div>
  <div className="overflow-y-scroll h-full no-scrollbar">
    <table className="border-collapse w-full text-center">
      <tbody>
        {data.map((prod, index) => (
          <tr
            className={`text-white ${
              index % 2 === 0 ? "bg-black" : "bg-slate-700"
            }`}
            key={index}
          >
            <td className="px-4 py-2 flex justify-center border-2">
              <img
                src={prod.imageUrls[0] || "https://via.placeholder.com/150"}
                alt="product"
                className="w-16 h-16"
              />
            </td>
            <td className="px-4 py-2 w-2/6 border-2">{prod.name}</td>
            <td className="px-4 py-2">{prod.mrp}</td>
            <td className="px-4 py-2">{prod.moqSalePrice}</td>
            <td className="px-4 py-2">G</td>
            <td className="px-4 py-2">Edit</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default Table;
