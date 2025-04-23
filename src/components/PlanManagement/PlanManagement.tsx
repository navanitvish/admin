// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import axiosInstance from "@/api/client";

// const PlanManagement = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState("create");
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const { register, handleSubmit, reset } = useForm();

//   // Fetch all plans
//   const { data: plans, isLoading, error } = useQuery({
//     queryKey: ["plans"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/plans/get-all-plans");
//       return response.data;
//     },
//   });

//   // Create plan mutation
//   const createPlanMutation = useMutation({
//     mutationFn: (newPlan) => axiosInstance.post("/plans/create-plans", newPlan),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["plans"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Update plan mutation
//   const updatePlanMutation = useMutation({
//     mutationFn: ({ id, updatedPlan }) =>
//       axiosInstance.put(`/${id}`, updatedPlan),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["plans"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Delete plan mutation
//   const deletePlanMutation = useMutation({
//     mutationFn: (id) => axiosInstance.delete(`/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["plans"]),
//   });

//   // Dialog handlers
//   const openDialog = (mode, plan = null) => {
//     setDialogMode(mode);
//     setSelectedPlan(plan);
//     setIsDialogOpen(true);
//     if (mode === "update" && plan) {
//       reset({ name: plan.name, description: plan.description, price: plan.price });
//     } else {
//       reset({ name: "", description: "", price: "" });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedPlan(null);
//   };

//   const onSubmit = async (data) => {
//     if (dialogMode === "create") {
//       createPlanMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedPlan) {
//       updatePlanMutation.mutate({ id: selectedPlan._id, updatedPlan: data });
//     }
//   };

//   const handleDelete = (id) => {
//     deletePlanMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading plans</div>;

//   return (
//     <div className="container p-4 mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Plan Management</h1>
//         <Button onClick={() => openDialog("create")}>Add Plan</Button>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {plans.map((plan) => (
//             <TableRow key={plan._id}>
//               <TableCell>{plan.name}</TableCell>
//               <TableCell>{plan.description}</TableCell>
//               <TableCell>{plan.price}</TableCell>
//               <TableCell>
//                 <Button variant="ghost" onClick={() => openDialog("update", plan)}>Edit</Button>
//                 <Button variant="ghost" onClick={() => handleDelete(plan._id)}>Delete</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Create/Update Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{dialogMode === "create" ? "Add Plan" : "Edit Plan"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input {...register("name", { required: true })} placeholder="Plan Name" className="mb-4" />
//             <Input {...register("description", { required: true })} placeholder="Description" className="mb-4" />
//             <Input
//               {...register("price", { required: true })}
//               placeholder="Price"
//               type="number"
//               className="mb-4"
//             />
//             <DialogFooter>
//               <Button type="submit">{dialogMode === "create" ? "Create" : "Update"}</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default PlanManagement;
//=====================================================
// import React, { useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import axiosInstance from "@/api/client";

// interface Plan {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
// }

// interface PlanFormInputs {
//   name: string;
//   description: string;
//   price: number;
// }

// const PlanManagement: React.FC = () => {
//   const queryClient = useQueryClient();
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
//   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
//   const { register, handleSubmit, reset } = useForm<PlanFormInputs>();

//   // Fetch all plans
//   const { data: plans = [], isLoading, error } = useQuery<Plan[]>({
//     queryKey: ["plans"],
//     queryFn: async () => {
//       const response = await axiosInstance.get<{ data: Plan[] }>("/plans/get-all-plans");
//       return response.data;
//     },
//   });

//   // Create plan mutation
//   const createPlanMutation = useMutation({
//     mutationFn: (newPlan: PlanFormInputs) => axiosInstance.post("/plans/create-plans", newPlan),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["plans"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Update plan mutation
//   const updatePlanMutation = useMutation({
//     mutationFn: ({ id, updatedPlan }: { id: string; updatedPlan: PlanFormInputs }) =>
//       axiosInstance.put(`/plans/${id}`, updatedPlan),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["plans"]);
//       setIsDialogOpen(false);
//     },
//   });

//   // Delete plan mutation
//   const deletePlanMutation = useMutation({
//     mutationFn: (id: string) => axiosInstance.delete(`/plans/${id}`),
//     onSuccess: () => queryClient.invalidateQueries(["plans"]),
//   });

//   // Dialog handlers
//   const openDialog = (mode: "create" | "update", plan: Plan | null = null) => {
//     setDialogMode(mode);
//     setSelectedPlan(plan);
//     setIsDialogOpen(true);
//     if (mode === "update" && plan) {
//       reset({ name: plan.name, description: plan.description, price: plan.price });
//     } else {
//       reset({ name: "", description: "", price: 0 });
//     }
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedPlan(null);
//   };

//   const onSubmit: SubmitHandler<PlanFormInputs> = (data) => {
//     if (dialogMode === "create") {
//       createPlanMutation.mutate(data);
//     } else if (dialogMode === "update" && selectedPlan) {
//       updatePlanMutation.mutate({ id: selectedPlan._id, updatedPlan: data });
//     }
//   };

//   const handleDelete = (id: string) => {
//     deletePlanMutation.mutate(id);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading plans</div>;

//   return (
//     <div className="container p-4 mx-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Plan Management</h1>
//         <Button onClick={() => openDialog("create")}>Add Plan</Button>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Name</TableHead>
//             <TableHead>Description</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {plans.map((plan) => (
//             <TableRow key={plan._id}>
//               <TableCell>{plan.name}</TableCell>
//               <TableCell>{plan.description}</TableCell>
//               <TableCell>{plan.price}</TableCell>
//               <TableCell>
//                 <Button variant="ghost" onClick={() => openDialog("update", plan)}>
//                   Edit
//                 </Button>
//                 <Button variant="ghost" onClick={() => handleDelete(plan._id)}>
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Create/Update Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{dialogMode === "create" ? "Add Plan" : "Edit Plan"}</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Input {...register("name", { required: true })} placeholder="Plan Name" className="mb-4" />
//             <Input {...register("description", { required: true })} placeholder="Description" className="mb-4" />
//             <Input
//               {...register("price", { required: true })}
//               placeholder="Price"
//               type="number"
//               className="mb-4"
//             />
//             <DialogFooter>
//               <Button type="submit">{dialogMode === "create" ? "Create" : "Update"}</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default PlanManagement;
//================================================
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/client";

interface Plan {
  _id: string;
  name: string;
  price: number;
  maxMessages: number;
  maxMessageSize: number;
  duration: number;
  questions: number;
  includesRemedies: boolean;
}

interface PlanFormInputs {
  name: string;
  price: number;
  maxMessages: number;
  maxMessageSize: number;
  duration: number;
  questions: number;
  includesRemedies: boolean;
}

const header = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const PlanManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { register, handleSubmit, reset } = useForm<PlanFormInputs>();
  // const { token } = useAuth();

  // Fetch all plans
  const {
    data: plans = [],
    isLoading,
    error,
  } = useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ data: Plan[] }>(
        "/plans/get-all-plans"
      );
      return response.data;
    },
  });

  // Create plan mutation
  const createPlanMutation = useMutation({
    mutationFn: (newPlan: PlanFormInputs) =>
      axiosInstance.post(
        "/plans/create-plans",

        newPlan,
        header
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["plans"]);
      setIsDialogOpen(false);
    },
  });

  // Update plan mutation
  const updatePlanMutation = useMutation({
    mutationFn: ({
      id,
      updatedPlan,
    }: {
      id: string;
      updatedPlan: PlanFormInputs;
    }) => axiosInstance.put(`/plans/${id}`, updatedPlan),
    onSuccess: () => {
      queryClient.invalidateQueries(["plans"]);
      setIsDialogOpen(false);
    },
  });

  // Delete plan mutation
  const deletePlanMutation = useMutation({
    mutationFn: (id: string) => axiosInstance.delete(`/plans/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["plans"]),
  });

  const openDialog = (mode: "create" | "update", plan: Plan | null = null) => {
    setDialogMode(mode);
    setSelectedPlan(plan);
    setIsDialogOpen(true);
    if (mode === "update" && plan) {
      reset(plan);
    } else {
      reset({
        name: "",
        price: 0,
        maxMessages: 0,
        maxMessageSize: 0,
        duration: 28,
        questions: 0,
        includesRemedies: false,
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPlan(null);
  };

  const onSubmit: SubmitHandler<PlanFormInputs> = (data) => {
    if (dialogMode === "create") {
      createPlanMutation.mutate(data);
    } else if (dialogMode === "update" && selectedPlan) {
      updatePlanMutation.mutate({ id: selectedPlan._id, updatedPlan: data });
    }
  };

  const handleDelete = (id: string) => {
    deletePlanMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading plans</div>;

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Plan Management</h1>
        <Button onClick={() => openDialog("create")}>Add Plan</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead>Message Size</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Remedies</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans.map((plan) => (
            <TableRow key={plan._id}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.price}</TableCell>
              <TableCell>{plan.maxMessages}</TableCell>
              <TableCell>{plan.maxMessageSize}</TableCell>
              <TableCell>{plan.duration}</TableCell>
              <TableCell>{plan.questions}</TableCell>
              <TableCell>{plan.includesRemedies ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => openDialog("update", plan)}
                >
                  Edit
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(plan._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "create" ? "Add Plan" : "Edit Plan"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name", { required: true })}
              placeholder="Plan Name"
              className="mb-4"
            />
            <Input
              {...register("price", { required: true })}
              placeholder="Price"
              type="number"
              className="mb-4"
            />
            <Input
              {...register("maxMessages")}
              placeholder="Max Messages"
              type="number"
              className="mb-4"
            />
            <Input
              {...register("maxMessageSize")}
              placeholder="Max Message Size"
              type="number"
              className="mb-4"
            />
            <Input
              {...register("duration")}
              placeholder="Duration (days)"
              type="number"
              className="mb-4"
            />
            <Input
              {...register("questions")}
              placeholder="Questions Allowed"
              type="number"
              className="mb-4"
            />
            <div className="mb-4">
              <label>
                <input {...register("includesRemedies")} type="checkbox" />{" "}
                Includes Remedies
              </label>
            </div>
            <DialogFooter>
              <Button type="submit">
                {dialogMode === "create" ? "Create" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanManagement;
