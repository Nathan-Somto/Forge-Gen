import React from "react";
import PrimaryBackground from "@/components/PrimaryBackground";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/hooks/useAuth";
import { getUserTransactions, TransactionData } from "@/lib/appwrite";
import { ActivityIndicator, View, FlatList } from "react-native";
import Colors from "@/constants/Colors";
export default function PaymentHistory() {
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
        // perform the arrangement here
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
              <View className="flex-row items-center mt-3 mb-4">
                <View
                  className="h-[1px] w-[45%] mr-2"
                  style={{ backgroundColor: Colors.neutral }}
                />
                <Text style={{ color: Colors.neutral }} className="text-center">
                  {item.date}
                </Text>
                <View
                  className="h-[1px] w-[45%]  ml-2"
                  style={{ backgroundColor: Colors.neutral }}
                />
              </View>
              {item.transactions.map((transaction) => (
                <View
                  key={transaction.tx_ref}
                  className="p-4 my-2 rounded-xl"
                  style={{ backgroundColor: Colors.btnSecondary }}
                >
                  <Text>Plan:   {transaction.plan}</Text>
                  <Text>Amount: {transaction.amount}</Text>
                  <Text>Credits: {transaction.credits} </Text>
                  <Text>
                    {new Date(transaction.createdAt).toLocaleDateString()}
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
