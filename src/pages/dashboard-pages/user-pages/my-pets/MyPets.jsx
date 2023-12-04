import { useContext, useMemo } from 'react';
import useAxiosSecure from '../../../../custom-hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { UserAuth } from '../../../../authprovider/AuthProvider';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
// import { flexRender, useReactTable } from '@tanstack/react-table';

const MyPets = () => {
    const { user } = useContext(UserAuth);
    const axiosSecure = useAxiosSecure();
    const { data: myPets = [], refetch } = useQuery({
        queryKey: ['myPet'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pets/email?email=${user?.email}`);
            return res?.data;
        }
    })

    const handleAdopt = id => {
        axiosSecure.put(`/pets/updatestatus/${id}`)
            .then(res => {
                console.log(res);
                swal('Congratulations', 'successfully updated adoption status', 'success');
                refetch();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleDelete = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this pet!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axiosSecure.delete(`/pets/${id}`)
                        .then(res => {
                            console.log(res);
                            swal("Poof! Pet has been deleted!", {
                                icon: "success",
                            });
                            refetch();
                        })
                        .catch(error => console.log(error));
                } else {
                    swal("Your pet is safe!");
                }
            });
    }

    // const columns = useMemo(
    //     () => [
    //         {
    //             header: 'Serial Number',
    //             accessorKey: '_id',
    //         },
    //         {
    //             header: 'Pet Name',
    //             accessorKey: 'name',
    //         },
    //         {
    //             header: 'Pet Category',
    //             accessorKey: 'category',
    //         },
    //         {
    //             header: 'Pet Image',
    //             accessorKey: 'imageURL',
    //             Cell: ({ value }) => <img src={value} alt="Pet" />,
    //         },
    //         {
    //             header: 'Adoption Status',
    //             accessorKey: 'adopted',
    //         },
    //         {
    //             header: 'Actions',
    //             Cell: () => (
    //                 <div>

    //                 </div>
    //             ),
    //         },
    //     ],
    //     []
    // );

    // const {
    //     getTableProps,
    //     getTableBodyProps,
    //     getHeaderGroups,
    //     rows,
    //     prepareRow,
    // } = useReactTable({ columns, myPets, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel() });
    // console.log(useReactTable({ columns, myPets, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel() }));

    // const table = useReactTable({myPets, columns});
    // console.log(table.getHeaderGroups);

    return (
        // <table {...getTableProps()}>
        //     <thead>
        //         {headerGroups?.map((headerGroup, i) => (
        //             <tr key={i} {...headerGroup.getHeaderGroupProps()}>
        //                 {headerGroup.headers.map((column, i) => (
        //                     <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
        //                         {column.render('Header')}
        //                         <span>
        //                             {column.isSorted
        //                                 ? column.isSortedDesc
        //                                     ? ' 🔽'
        //                                     : ' 🔼'
        //                                 : ''}
        //                         </span>
        //                     </th>
        //                 ))}
        //             </tr>
        //         ))}
        //     </thead>
        //     <tbody {...getTableBodyProps()}>
        //         {rows?.map((row, i) => {
        //             prepareRow(row);
        //             return (
        //                 <tr key={i} {...row.getRowProps()}>
        //                     {row.cells.map((cell, i) => (
        //                         <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
        //                     ))}
        //                 </tr>
        //             );
        //         })}
        //     </tbody>
        // </table>
        // <table>
        //     <thead>
        //         {getHeaderGroups?.map((headerGroup, i) => (
        //             <tr key={i}>
        //                 {headerGroup.headers.map((column, i) => (
        //                     <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())}>
        //                         {column.render('Header')}
        //                         <span>
        //                             {column.isSorted
        //                                 ? column.isSortedDesc
        //                                     ? ' 🔽'
        //                                     : ' 🔼'
        //                                 : ''}
        //                         </span>
        //                     </th>
        //                 ))}
        //             </tr>
        //         ))}
        //     </thead>
        //     <tbody>
        //         {rows?.map((row, i) => {
        //             prepareRow(row);
        //             return (
        //                 <tr key={i} {...row.getRowProps()}>
        //                     {row.cells.map((cell, i) => (
        //                         <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
        //                     ))}
        //                 </tr>
        //             );
        //         })}
        //     </tbody>
        // </table>
        <table className='mx-auto mt-24 text-center px-4 w-full'>
            {/* {
                table.getHeaderGroups && table.getHeaderGroups.map(headerGroup => (
                    <tr key={headerGroup?.id}>
                        {
                            headerGroup?.headers?.map(header => (
                                <th key={header?.id}>
                                    {
                                        flexRender(header?.column?.columnDef?.header, header?.getContext())
                                    }
                                </th>
                            ))
                        }
                    </tr>
                ))
            } */}
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Pet Image</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th>Adopt</th>
                </tr>
            </thead>
            <tbody>
                {
                    myPets?.map((pet, i) => <tr key={pet?._id}>
                        <td>{i + 1}</td>
                        <td>{pet?.name}</td>
                        <td>{pet?.category}</td>
                        <td><img className='h-8 w-8' src={pet?.imageURL} alt=''></img></td>
                        <td>
                            <Link to={`/dashboard/update-a-pet/${pet?._id}`}>
                                <button className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Update</button>
                            </Link>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(pet?._id)} className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Delete</button>
                        </td>
                        <td>
                            {
                                pet?.adopted === true ?
                                    <p className='text-green-500'>Adopted</p>
                                    :
                                    <button onClick={() => handleAdopt(pet?._id)} className='px-5 py-1 my-1 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 text-lg font-semibold text-white border-2 hover:border-0 border-pink-500 hover:shadow-[0px_5px_2rem_1px_pink] font-comforta'>Adopt</button>
                            }
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    );
}

export default MyPets;
