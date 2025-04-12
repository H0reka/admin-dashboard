import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Cookies from "js-cookie";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "/fonts/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/Roboto-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/fonts/Roboto-Regular.ttf",
      fontWeight: "normal",
    },
  ],
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
    backgroundColor: "#ffffff",
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const tw = createTw({
  theme: {
    extend: {
      colors: {
        brand: "#c63",
        "body-bg": "#27272a",
      },
    },
  },
});
// Convert the amount to words
const convertToWords = (num) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const suffixes = ["", "Thousand", "Lakh", "Crore"];

  if (isNaN(num)) return "Invalid number";

  let [integerPart, decimalPart] = num.toString().split(".");
  integerPart = parseInt(integerPart, 10);
  decimalPart = decimalPart ? parseInt(decimalPart.substring(0, 2), 10) : 0;

  function convertLessThanThousand(n) {
    if (n < 20) return ones[n];
    if (n < 100)
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " and " + convertLessThanThousand(n % 100) : "")
    );
  }

  let word = "";
  let i = 0;

  while (integerPart > 0) {
    let part = integerPart % 1000;
    if (part !== 0) {
      word =
        convertLessThanThousand(part) +
        (suffixes[i] ? " " + suffixes[i] + " " : "") +
        word;
    }
    integerPart = Math.floor(integerPart / 1000);
    i++;
  }

  let result = "Rupees " + word.trim();

  if (decimalPart > 0) {
    result += " and " + convertLessThanThousand(decimalPart) + " Paise";
  }

  return result + " Only";
};
const InvoiceTemplate = ({ orders, phoneNumbers }) => (
  <Document>
    {orders.map((order, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <View
          style={tw("flex flex-row justify-between items-center p-3")}
          fixed
        >
          <View style={tw("w-[26rem] flex flex-col gap-[0.2rem]")}>
            <Text style={[tw("font-bold"), styles.textBold]}>
              Horeka Supply India Private Limited
            </Text>
            <Text style={tw("text-xs")}>
              19/5, Opposition Srinivasa Signature, Bellandur Main Road,
              Kaikondrahalli, Bengaluru
            </Text>
            <Text style={tw("text-xs")}>Phone no.: +919606150255</Text>
            <Text style={tw("text-xs")}>Email: hello@horeka.app</Text>
            <Text style={tw("text-xs")}>GSTIN: 29AAHCH4494H1Z4</Text>
            <Text style={tw("text-xs")}>State: 29-Karnataka</Text>
          </View>
          <View>
            <Image src="/image.png" style={tw("w-16 h-16")} />
          </View>
        </View>
        <View style={tw("border-b-2 w-[97vw] mx-3 border-brand")} fixed></View>
        <View style={tw("p-3")}>
          <View style={tw("text-black justify-center items-center")}>
            <Text style={tw("text-brand font-bold")}>Tax Invoice</Text>
          </View>
          <View style={tw("flex flex-row justify-between")}>
            <View style={tw("w-64")}>
              <Text style={tw("text-sm font-bold mb-2")}>Bill To</Text>
              <Text style={tw("text-sm")}>
                {order.outlet.name.toUpperCase()}
              </Text>
              <Text style={tw("text-sm")}>Address: {order.outlet.address}</Text>
              <Text style={tw("text-sm")}>
                Contact: {phoneNumbers.get(order.outlet.id)?.substring(3)}
              </Text>
              <Text style={tw("text-sm")}>
                GSTIN: {order.outlet.gstNumber ? order.outlet.gstNumber : ""}{" "}
              </Text>
              <Text style={tw("text-sm")}>State: {order.outlet.state}</Text>
            </View>
            <View>
              <Text style={tw("mb-2 text-sm font-bold")}>Invoice Details</Text>
              <Text style={tw("text-sm")}>Invoice No.: HRKS</Text>
              <Text style={tw("text-sm")}>
                Date: {new Date(Date.now()).toDateString()}
              </Text>
              <Text style={tw("text-sm")}>Place of Supply: 29-Karnataka</Text>
            </View>
          </View>
          <Table style={tw("border-0 mt-6")}>
            <TH
              style={tw("flex flex-row justify-between p-2 bg-brand text-sm")}
            >
              <TD>#</TD>
              <TD style={tw("mr-2")}>Item Name</TD>
              <TD style={tw("mr-2")}>HSN/ SAC</TD>
              <TD>Quantity</TD>
              <TD>Unit</TD>
              <TD>Price/ unit</TD>
              <TD>Gross Amount</TD>
              <TD>GST</TD>
              <TD>Amount</TD>
            </TH>
            {/*  */}
            {order.orderItems.map((item, index) => (
              <TR style={tw("text-xs p-2")} key={index}>
                <TD>{index + 1}</TD>
                <TD style={tw("mr-2")}>{item.product.name}</TD>
                <TD style={tw("ml-2")}>{item.product.hsnCode}</TD>
                <TD>{item.quantity}</TD>
                <TD>{item.product.unit.name}</TD>
                <TD>
                  ₹{" "}
                  {(
                    item.price /
                    (1 + item.product.gstPercentage / 100)
                  ).toFixed(2)}
                </TD>
                <TD>
                  ₹{" "}
                  {(
                    (item.price / (1 + item.product.gstPercentage / 100)) *
                    item.quantity
                  ).toFixed(2)}
                </TD>
                <TD>{item.product.gstPercentage}%</TD>
                <TD>₹ {item.price * item.quantity}</TD>
              </TR>
            ))}
          </Table>
        </View>
        <View style={tw("flex flex-row gap-4")} wrap={false}>
          <View style={tw("p-3 flex flex-col gap-4")}>
            <View style={tw("flex flex-col gap-2")}>
              <Text style={tw("text-sm font-bold")}>
                Invoice Amount in Words
              </Text>
              <Text style={tw("text-xs w-96")}>
                {convertToWords(order.amount)}
              </Text>
            </View>
            <View style={tw("flex flex-col gap-2")}>
              <Text style={tw("text-sm font-bold")}>Terms and Conditions</Text>
              <Text style={tw("text-xs")}>
                Thank you for doing business with us.
              </Text>
            </View>
            <View style={tw("flex flex-row gap-4")}>
              <View>
                <Image src="/payment_qr.jpg" style={tw("w-24 h-24")} />
              </View>
              <View style={tw("flex flex-col gap-2")}>
                <Text style={tw("text-xs font-bold")}>Pay To: </Text>
                <Text style={tw("text-xs")}>
                  Bank Name: HDFC Bank, Bangalore - Sarjapur Road
                </Text>
                <Text style={tw("text-xs")}>
                  Bank Account No.: 50200103252781
                </Text>
                <Text style={tw("text-xs")}>Bank IFSC code: HDFC0000354</Text>
                <Text style={tw("text-xs")}>
                  Account Holder's Name: Horeka Supply India Private Limited
                </Text>
              </View>
            </View>
          </View>
          <View style={tw("flex-col gap-[0.1rem] w-96 p-3")}>
            <View style={tw("flex flex-row justify-between p-1")}>
              <Text style={tw("text-sm")}>Sub Total</Text>
              <Text style={tw("text-sm")}>₹ {order.itemsTotal}</Text>
            </View>
            <View style={tw("flex flex-row justify-between bg-brand p-1")}>
              <Text style={tw("text-sm font-bold")}>Total</Text>
              <Text style={tw("text-sm font-bold")}>₹ {order.amount}</Text>
            </View>
            <View style={tw("flex flex-row justify-between p-1")}>
              <Text style={tw("text-sm")}>Received</Text>
              <Text style={tw("text-sm")}>₹ {order.amount}</Text>
            </View>
            <View style={tw("flex flex-row justify-between p-1")}>
              <Text style={tw("text-sm")}>Balance</Text>
              <Text style={tw("text-sm")}>₹ 0</Text>
            </View>
          </View>
        </View>
        <View style={tw("border-b-2 m-3 border-dashed")}></View>
        <View wrap={false}>
          <View style={tw("text-center")}>
            <Text style={tw("text-lg font-bold")}>Acknowledgement</Text>
            <Text style={tw("text-xl text-brand font-bold")}>
              Horeka Supply India Private Limited
            </Text>
          </View>
          <View style={tw("p-3")}>
            <View style={tw("flex flex-row justify-between")}>
              <View style={tw("flex flex-row justify-between")}>
                <View style={tw("w-64")}>
                  <Text
                    style={[tw("mb-2 text-sm text-brand"), styles.textBold]}
                  >
                    Invoice To:
                  </Text>
                  <Text style={tw("text-sm")}>{order.outlet.name}</Text>
                  <Text style={tw("text-sm")}>{order.outlet.address}</Text>
                </View>
                <View style={tw("ml-2")}>
                  <Text
                    style={[tw("mb-2 text-sm text-brand"), styles.textBold]}
                  >
                    Invoice Details
                  </Text>
                  <Text style={tw("text-sm")}>Invoice No.: </Text>
                  <Text style={tw("text-sm")}>
                    Invoice Date: {new Date(Date.now()).toDateString()}
                  </Text>
                  <Text style={tw("text-sm")}>
                    Invoice Amount: ₹ {order.amount}
                  </Text>
                </View>
              </View>
              <View>
                <View style={tw("border-b-2 border-dashed mt-14")}></View>
                <View style={tw("text-sm")}>
                  <Text>Receiver's Seal and Sign</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    ))}
  </Document>
);
const MyDocument = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState(new Map());
  const location = useLocation();
  const { orders } = location.state;
  const token = Cookies.get("dev.admin.horeka");
  useEffect(() => {
    const outlets = new Set();
    orders.forEach((order) => {
      outlets.add(order.outlet.id);
    });
    const ownerMappedOutlet = new Map();

    Promise.all(
      [...outlets].map((x) =>
        axios
          .get(`${server}/admin/owner/outlet/${x}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => ownerMappedOutlet.set(x, res.data.phoneNum))
      )
    ).then(() => {
      setPhoneNumbers(new Map(ownerMappedOutlet));
    });

    setOrdersList(orders);
  }, [orders]);
  return (
    <div className="h-[97vh] ml-40">
      <PDFViewer width="100%" height="100%">
        {/* <Doc/> */}
        {ordersList && (
          <InvoiceTemplate orders={orders} phoneNumbers={phoneNumbers} />
        )}
      </PDFViewer>
    </div>
  );
};
export default MyDocument;
