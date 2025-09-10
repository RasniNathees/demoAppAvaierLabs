import React, { useState } from "react"
import { useAppContext } from "../../appcontext"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import { mockAPI } from "../../data/mockdata"

const BorrowerCard = () => {
  const { activeTab, setActiveTab, activeBorrowerId, setActiveBorrowerId } =
    useAppContext()
  const [radioValue, setRadioValue] = useState("active")

  const tabs = [
    { key: "new", label: "New", count: mockAPI.borrowers.pipeline.new.length },
    {
      key: "in_review",
      label: "In Review",
      count: mockAPI.borrowers.pipeline.in_review.length,
    },
    {
      key: "approved",
      label: "Approved",
      count: mockAPI.borrowers.pipeline.approved.length,
    },
  ]

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "new"
      case "in review":
        return "review"
      case "renew":
        return "renew"
      default:
        return "default"
    }
  }

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label}
              <span className="ml-2 text-xs text-gray-400">({tab.count})</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          const borrowers = mockAPI.borrowers.pipeline[tab.key] || []
          return (
            <TabsContent key={tab.key} value={tab.key}>
              <div className="mt-6 space-y-4">
                {borrowers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No borrowers in this category
                  </div>
                ) : (
                  borrowers.map((borrower) => (
                    <div
                      key={borrower.id}
                      onClick={() => setActiveBorrowerId(borrower.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        activeBorrowerId === borrower.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {borrower.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {borrower.loan_type}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 mb-1">
                            {formatAmount(borrower.amount)}
                          </p>
                          <Badge variant={getBadgeVariant(borrower.status)}>
                            {borrower.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          F-SANITISED ACTIVE
        </h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="status"
              value="active"
              checked={radioValue === "active"}
              onChange={(e) => setRadioValue(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={radioValue === "inactive"}
              onChange={(e) => setRadioValue(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Inactive</span>
          </label>
        </div>
      </div>
    </Card>
  )
}

export default BorrowerCard
