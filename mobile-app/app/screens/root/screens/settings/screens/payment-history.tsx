import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/hooks/useAuth";
import { getUserTransactions, TransactionData } from "@/lib/appwrite";
import { ActivityIndicator, View, FlatList } from "react-native";
import Colors from "@/constants/Colors";

export default function PaymentHistoryScreen() {
  const { user } = useAuth((state) => state.auth);
  const userId = user?.$id ?? "";
  const [loading, setLoading] = React.useState(false);
  const [transactions, setTransactions] = React.useState<
    {
      date: string;
      transactions: TransactionData[];
    }[]
  >([]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getUserTransactions(userId);
        const arrangedData = data.reduce((acc, curr) => {
          const date = new Date(curr.created_at).toDateString();
          const index = acc.findIndex((item) => item.date === date);
          if (index === -1) {
            acc.push({ date, transactions: [curr] });
          } else {
            acc[index].transactions.push(curr);
          }
          return acc;
        }, [] as { date: string; transactions: TransactionData[] }[]);
        setTransactions(arrangedData);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return (
    <PrimaryBackground>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={Colors.text} size="large" />
        </View>
      ) : transactions.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text>No Payment History</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View>
              {/* Section header for date */}
              <View className="flex-row items-center w-[95%] mx-auto mt-6 mb-4">
                <View
                  className="h-[1px] w-[35%] mr-2 flex-[1/6]"
                  style={{ backgroundColor: Colors.neutral }}
                />
                <Text className="text-center text-sm font-semibold text-gray-600 flex-[4/6]">
                  {item.date}
                </Text>
                <View
                  className="h-[1px] w-[35%] ml-2 flex-[1/6]"
                  style={{ backgroundColor: Colors.neutral }}
                />
              </View>

              {/* Transaction card */}
              {item.transactions.map((transaction) => (
                <View
                  key={transaction.tx_ref}
                  className="p-4 my-2 rounded-xl w-[90%] mx-auto"
                  style={{ backgroundColor: Colors.btnSecondary }}
                >
                  <Text className="font-medium  mb-1" style={{color: Colors.neutral}}>
                    Plan:{" "}
                    <Text className="font-normal">{transaction.plan}</Text>
                  </Text>
                  <Text className=" font-medium  mb-1" style={{color: Colors.neutral}}>
                    Amount:{" "}
                    <Text className="font-normal">{transaction.amount}</Text>
                  </Text>
                  <Text className=" font-medium  mb-1" style={{color: Colors.neutral}}>
                    Credits:{" "}
                    <Text className="font-normal">{transaction.credits}</Text>
                  </Text>
                  <Text className="text-sm font-normal text-gray-600">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </PrimaryBackground>
  );
}
