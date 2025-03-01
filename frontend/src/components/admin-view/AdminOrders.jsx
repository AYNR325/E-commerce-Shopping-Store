import React from 'react'
import { Card, CardHeader, CardTitle,CardContent } from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow,TableCell } from '../ui/table'
import { Dialog } from '../ui/dialog'

import { useState } from 'react'
import AdminOrderDetails from './AdminOrderDetails'
function AdminOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  return (
    <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead>Order Price</TableHead>
                        <TableHead>
                          <span className="sr-only"> View Details</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>123456</TableCell>
                        <TableCell>2022-01-01</TableCell>
                        <TableCell>Completed</TableCell>
                        <TableCell>$100.00</TableCell>
                        <TableCell>
                            <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                          <button className="btn btn-primary bg-black text-white p-2 rounded-xl hover:bg-white hover:text-black border-black border-[1px]" onClick={()=>setOpenDetailsDialog(true)}> View Details</button>
                          <AdminOrderDetails/>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>789012</TableCell>
                        <TableCell>2022-02-01</TableCell>
                        <TableCell>Shipped</TableCell>
                        <TableCell>$200.00</TableCell>
                        <TableCell>
                          <button className="btn btn-primary bg-black text-white p-2 rounded-xl hover:bg-white hover:text-black border-black border-[1px]"> View Details</button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
        </Card>
  )
}

export default AdminOrders