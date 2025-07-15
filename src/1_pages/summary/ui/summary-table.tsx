// import { useSummaryStore } from "../model";
// import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/ui/table";

// export const SummaryTable = () => {
//   const { table } = useSummaryStore();

//   if (!table || !table.data || table.data.length === 0) {
//     return null;
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Таблица данных</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Продукт</TableHead>
//               <TableHead>Количество чеков</TableHead>
//               <TableHead>Связанная выручка</TableHead>
//               <TableHead>Продано</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {table.data.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell>{row.product_name}</TableCell>
//                 <TableCell>{row.checkCount}</TableCell>
//                 <TableCell>{row.relatedProceeds}</TableCell>
//                 <TableCell>{row.relatedSold}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };
