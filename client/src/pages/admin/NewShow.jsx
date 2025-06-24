// import React, { useState } from "react";
// import {
//   Tabs,
//   Tab,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   Grid,
// } from "@mui/material";

import UploadFile from "../../component/admin/UplaodFile";

// const NewShow = () => {
//   const [tab, setTab] = useState(0);
//   const [form, setForm] = useState({
//     type: "movie",
//     title: "",
//     description: "",
//     genres: [],
//     language: [],
//     releaseDate: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const tabs = [
//     { label: "Type" },
//     { label: "Details" },
//     { label: "Tags" },
//     { label: "Upload" },
//   ];

//   return (
//     <div className="flex h-screen bg-[#f8fafc] p-4 gap-6">
//       {/* Left: Live Preview */}
//       <div className="w-1/2">
//         <Paper elevation={3} className="p-6 rounded-xl">
//           <Typography variant="h5" className="mb-4 font-bold">
//             Live Preview
//           </Typography>
//           <Box className="space-y-3">
//             <Typography variant="h6" className="font-semibold text-[#111827]">
//               {form.title || "Title Here"}
//             </Typography>
//             <Typography className="text-gray-500 italic">
//               {form.description || "Description..."}
//             </Typography>
//             <Typography>
//               <b>Type:</b> {form.type}
//             </Typography>
//             <Typography>
//               <b>Genres:</b> {form.genres.join(", ")}
//             </Typography>
//             <Typography>
//               <b>Language:</b> {form.language.join(", ")}
//             </Typography>
//             <Typography>
//               <b>Release Date:</b> {form.releaseDate}
//             </Typography>
//           </Box>
//         </Paper>
//       </div>

//       {/* Right: Multi-step Form */}
//       <div className="w-1/2">
//         <Paper elevation={3} className="p-6 rounded-xl">
//           <Tabs
//             value={tab}
//             onChange={(e, newVal) => setTab(newVal)}
//             variant="fullWidth"
//           >
//             {tabs.map((t, index) => (
//               <Tab key={index} label={t.label} />
//             ))}
//           </Tabs>

//           <div className="relative min-h-[400px]">
//             {/* Tab 1: Type */}
//             <div
//               className={`${
//                 tab === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
//               } transition-opacity absolute w-full`}
//             >
//               <Typography variant="h6" className="my-6 font-semibold">
//                 Choose Show Type *
//               </Typography>
//               <div className="flex justify-around">
//                 <Box
//                   onClick={() => setForm({ ...form, type: "movie" })}
//                   className={`cursor-pointer p-8 rounded-xl shadow-md w-40 text-center border-2 transition-all ${
//                     form.type === "movie"
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <Typography variant="h6">Movie</Typography>
//                 </Box>
//                 <Box
//                   onClick={() => setForm({ ...form, type: "webseries" })}
//                   className={`cursor-pointer p-8 rounded-xl shadow-md w-40 text-center border-2 transition-all ${
//                     form.type === "webseries"
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <Typography variant="h6">Web Series</Typography>
//                 </Box>
//               </div>
//             </div>

//             {/* Tab 2: Details */}
//             <div
//               className={`${
//                 tab === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
//               } transition-opacity absolute w-full`}
//             >
//               <Box className="space-y-4 mt-6">
//                 <TextField
//                   name="title"
//                   label="Show Title *"
//                   value={form.title}
//                   onChange={handleChange}
//                   fullWidth
//                   size="small"
//                 />
//                 <TextField
//                   name="description"
//                   label="Description *"
//                   value={form.description}
//                   onChange={handleChange}
//                   multiline
//                   rows={3}
//                   fullWidth
//                   size="small"
//                 />
//                 <TextField
//                   name="releaseDate"
//                   label="Release Date *"
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                   value={form.releaseDate}
//                   onChange={handleChange}
//                   fullWidth
//                   size="small"
//                 />
//                 <Box className="border border-dashed border-blue-300 p-6 text-center rounded-lg text-gray-500">
//                   Poster Upload (Coming Soon)
//                 </Box>
//               </Box>
//             </div>

//             {/* Tab 3: Tags */}
//             <div
//               className={`${
//                 tab === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
//               } transition-opacity absolute w-full`}
//             >
//               <Box className="space-y-4 mt-6">
//                 <TextField
//                   name="genres"
//                   label="Genres * (comma separated)"
//                   value={form.genres.join(", ")}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       genres: e.target.value.split(",").map((g) => g.trim()),
//                     })
//                   }
//                   fullWidth
//                   size="small"
//                 />
//                 <TextField
//                   name="language"
//                   label="Languages * (comma separated)"
//                   value={form.language.join(", ")}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       language: e.target.value.split(",").map((l) => l.trim()),
//                     })
//                   }
//                   fullWidth
//                   size="small"
//                 />
//               </Box>
//             </div>

//             {/* Tab 4: Upload */}
//             <div
//               className={`${
//                 tab === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
//               } transition-opacity absolute w-full`}
//             >
//               <Box className="border border-dashed border-blue-300 p-10 text-center rounded-lg text-gray-500 mt-6">
//                 Upload Section (Next Phase)
//               </Box>
//             </div>
//           </div>

//           <div className="flex justify-between mt-10">
//             <Button
//               variant="outlined"
//               disabled={tab === 0}
//               onClick={() => setTab((prev) => prev - 1)}
//             >
//               Back
//             </Button>
//             <Button
//               variant="contained"
//               onClick={() => {
//                 if (tab < 3) setTab((prev) => prev + 1);
//                 else alert("Submit functionality coming soon");
//               }}
//             >
//               {tab === 3 ? "Submit" : "Next"}
//             </Button>
//           </div>
//         </Paper>
//       </div>
//     </div>
//   );
// };

// export default NewShow;

const NewShow = () => {
  return (
    <div>
      <UploadFile />
    </div>
  );
};
export default NewShow;
