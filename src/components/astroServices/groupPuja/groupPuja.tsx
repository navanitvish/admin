
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/api/client";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import PoojaForm from "./poojaForm";

const fetchGroupPujas = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/astro-services/pujas`, {
    params: { page, limit },
  });
  return response;
};

const fetchAstrologers = async () => {
  const response = await axiosInstance.get("/astrologers");
  return response.data;
};

const createGroupPuja = async (newPuja) => {
  const response = await axiosInstance.post("/astro-services/pujas", newPuja);
  return response.data;
};

const updateGroupPuja = async (updatedPuja) => {
  const response = await axiosInstance.put(
    `/astro-services/pujas/${updatedPuja._id}`,
    updatedPuja
  );
  return response.data;
};

const deleteGroupPuja = async (id) => {
  const response = await axiosInstance.delete(`/astro-services/pujas/${id}`);
  return response.data;
};

const GroupPujaManagement = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit for now
  const [totalPages, setTotalPages] = useState(1);

  const queryClient = useQueryClient();

  const {
    data: pujasData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["groupPujas", page],
    queryFn: () => fetchGroupPujas(page, limit),
    onSuccess: (data) => setTotalPages(data.totalPages), // Update total pages
  });

  const { data: astrologers = [] } = useQuery({
    queryKey: ["astrologers"],
    queryFn: fetchAstrologers,
  });

  const createPujaMutation = useMutation({
    mutationFn: createGroupPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
      setIsDialogOpen(false);
      Toast({
        title: "Success",
        description: "Group Puja created successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePujaMutation = useMutation({
    mutationFn: updateGroupPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
      setIsDialogOpen(false);
      Toast({
        title: "Success",
        description: "Group Puja updated successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePujaMutation = useMutation({
    mutationFn: deleteGroupPuja,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groupPujas"] });
      Toast({
        title: "Success",
        description: "Group Puja deleted successfully",
      });
    },
    onError: (error) => {
      Toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      date: new Date(data.date).toISOString(),
      price: parseFloat(data.price),
      maxParticipants: parseInt(data.maxParticipants),
      bookedParticipants: parseInt(data.bookedParticipants),
    };

    if (isEditMode) {
      updatePujaMutation.mutate({ ...formattedData, _id: selectedPuja._id });
    } else {
      createPujaMutation.mutate(formattedData);
    }
  };

  const handleEdit = (puja) => {
    setIsEditMode(true);
    setSelectedPuja(puja);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this puja?")) {
      deletePujaMutation.mutate(id);
    }
  };

  const handleDialogOpen = () => {
    setIsEditMode(false);
    setSelectedPuja(null);
    setIsDialogOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (isError) return <div>Error loading pujas: {error.message}</div>;

  const { pujas, totalPujas } = pujasData || { pujas: [], totalPujas: 0 };
  console.log("qweq", pujasData);

  return (
    <Layout>
      <Layout.Header className="border border-b fixed w-full">
        <div className=" flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className="container mx-auto p-4 mt-16">
          <h1 className="text-2xl font-bold mb-4">Group Puja Management</h1>
          
              <Button onClick={handleDialogOpen}>Add New Puja</Button>
          

         

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Puja Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Max Participants</TableHead>
                <TableHead>Booked Participants</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pujas.map((puja) => (
                <TableRow key={puja._id}>
                  <TableCell>{puja.pujaName}</TableCell>
                  <TableCell>
                    {new Date(puja.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{puja.location}</TableCell>
                  <TableCell>${puja.price}</TableCell>
                  <TableCell>{puja.maxParticipants}</TableCell>
                  <TableCell>{puja.bookedParticipants}</TableCell>
                  <TableCell>
                    {puja.image && (
                      <img
                        src={puja.image}
                        alt={puja.pujaName}
                        className="w-12 h-12 object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(puja)} className="mr-2">
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(puja._id)}
                      variant="destructive"
                      disabled={deletePujaMutation.isPending}
                    >
                      {deletePujaMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      href="#"
                      isActive={idx + 1 === page}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
           
           <DialogContent className="max-w-4xl h-auto">
             <DialogHeader>
               <DialogTitle>
                 {isEditMode ? "Edit Puja" : "Add New Puja"}
               </DialogTitle>
             </DialogHeader>
             <PoojaForm
               onSubmit={onSubmit}
               isEditMode={isEditMode}
               initialData={selectedPuja}
               astrologers={astrologers}
               isPending={
                 createPujaMutation.isPending || updatePujaMutation.isPending
               }
             />
           </DialogContent>
         </Dialog>
        </div>

        
      </Layout.Body>
    </Layout>
  );
};

export default GroupPujaManagement;
