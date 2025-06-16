
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface TableData {
  id: string;
  name: string;
  headers: string[];
  rows: string[][];
  createdAt: string;
}

const TableView: React.FC = () => {
  const [tables, setTables] = useState<TableData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<TableData | null>(null);
  const [tableName, setTableName] = useState('');
  const [headers, setHeaders] = useState(['Column 1', 'Column 2']);
  const [rows, setRows] = useState([['', '']]);
  const { toast } = useToast();

  const handleCreateTable = () => {
    setEditingTable(null);
    setTableName('');
    setHeaders(['Column 1', 'Column 2']);
    setRows([['', '']]);
    setIsModalOpen(true);
  };

  const handleEditTable = (table: TableData) => {
    setEditingTable(table);
    setTableName(table.name);
    setHeaders([...table.headers]);
    setRows([...table.rows]);
    setIsModalOpen(true);
  };

  const handleSaveTable = () => {
    if (!tableName.trim()) return;

    const tableData: TableData = {
      id: editingTable?.id || Date.now().toString(),
      name: tableName.trim(),
      headers: [...headers],
      rows: [...rows],
      createdAt: editingTable?.createdAt || new Date().toISOString(),
    };

    if (editingTable) {
      setTables(prev => prev.map(table => table.id === editingTable.id ? tableData : table));
      toast({
        title: "Table updated! ✏️",
        description: "Your table has been successfully updated.",
      });
    } else {
      setTables(prev => [...prev, tableData]);
      toast({
        title: "Table created! 📊",
        description: "Your new table is ready to use.",
      });
    }

    setIsModalOpen(false);
  };

  const handleDeleteTable = (id: string) => {
    setTables(prev => prev.filter(table => table.id !== id));
    toast({
      title: "Table deleted",
      description: "Table has been removed from your collection.",
    });
  };

  const addColumn = () => {
    setHeaders(prev => [...prev, `Column ${prev.length + 1}`]);
    setRows(prev => prev.map(row => [...row, '']));
  };

  const addRow = () => {
    setRows(prev => [...prev, new Array(headers.length).fill('')]);
  };

  const updateHeader = (index: number, value: string) => {
    setHeaders(prev => prev.map((header, i) => i === index ? value : header));
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    setRows(prev => prev.map((row, i) => 
      i === rowIndex 
        ? row.map((cell, j) => j === colIndex ? value : cell)
        : row
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Tables</h2>
        <Button onClick={handleCreateTable} className="text-lg">
          <Plus className="mr-2 h-5 w-5" />
          New Table
        </Button>
      </div>

      {tables.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No tables yet</h3>
          <p className="text-lg text-muted-foreground mb-6">
            Create your first table to organize data and information
          </p>
          <Button onClick={handleCreateTable} size="lg" className="text-lg">
            <Plus className="mr-2 h-5 w-5" />
            Create First Table
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {tables.map((table) => (
            <div key={table.id} className="task-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">{table.name}</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTable(table)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTable(table.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {table.headers.map((header, index) => (
                        <th
                          key={index}
                          className="border border-border bg-muted p-3 text-left font-semibold text-base"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-border p-3 text-base"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingTable ? 'Edit Table' : 'Create New Table'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="tableName" className="text-base font-medium">
                Table Name
              </Label>
              <Input
                id="tableName"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="Enter table name..."
                className="text-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Table Content</Label>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={addColumn}>
                    Add Column
                  </Button>
                  <Button variant="outline" size="sm" onClick={addRow}>
                    Add Row
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto border border-border rounded-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {headers.map((header, index) => (
                        <th key={index} className="border-b border-border bg-muted p-2">
                          <Input
                            value={header}
                            onChange={(e) => updateHeader(index, e.target.value)}
                            className="font-semibold text-center"
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border-b border-border p-2">
                            <Input
                              value={cell}
                              onChange={(e) => updateCell(rowIndex, cellIndex, e.target.value)}
                              placeholder={`Row ${rowIndex + 1}`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-base">
              Cancel
            </Button>
            <Button onClick={handleSaveTable} disabled={!tableName.trim()} className="text-base">
              {editingTable ? 'Update Table' : 'Create Table'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableView;
