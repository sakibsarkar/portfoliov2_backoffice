import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IVendor } from "@/types/vendor";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import EditVendor from "./EditVendor";
interface IProps {
  vendors: IVendor[];
  isLoading: boolean;
}

const VendorsTable: React.FC<IProps> = ({ vendors, isLoading }) => {
  return (
    <Card className="mt-[15px] relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors?.map((vendor) => (
              <TableRow key={vendor._id}>
                <TableCell>{vendor._id}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-start gap-[5px]">
                    <Avatar>
                      <AvatarImage src={vendor.image} />
                      <AvatarFallback>
                        {vendor.name
                          .split(" ")
                          .map((name) => name.charAt(0))
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <p>{vendor.name}</p>
                  </div>
                </TableCell>

                <TableCell>
                  {format(new Date(vendor.createdAt), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <div className="flex  gap-[5px]">
                    <EditVendor vendor={vendor} />
                    <Link
                      to={`/dashboard/purchase/vendor/${vendor._id}`}
                      className="hover:text-green-400"
                    >
                      <Eye className="w-5" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {isLoading ? (
        <span className="center gap-[15px] bg-[#cfcfcfa6] w-full h-full absolute top-0 left-0">
          Loading...
        </span>
      ) : (
        ""
      )}
    </Card>
  );
};

export default VendorsTable;
