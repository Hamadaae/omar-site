"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Mail,
  MailOpen,
  Inbox,
  Clock,
  User,
  AtSign,
  Phone,
  MessageSquare,
  Search,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "PATCH" });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
        );
        if (selectedMessage?._id === id) {
          setSelectedMessage((prev) => prev && { ...prev, isRead: true });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Message deleted successfully");
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      } else {
        toast.error(data.error || "Failed to delete message");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleSelectMessage = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      await handleMarkAsRead(message._id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRelativeDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "var(--color-admin-primary)" }}
          />
          <span style={{ color: "var(--color-admin-text-muted)" }}>
            Loading messages...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--color-admin-text)" }}
            >
              Messages
            </h1>
            {unreadCount > 0 && (
              <Badge
                style={{
                  backgroundColor: "var(--color-admin-accent)",
                  color: "var(--color-admin-text)",
                }}
              >
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p
            style={{ color: "var(--color-admin-text-muted)" }}
            className="mt-1"
          >
            View and manage contact form submissions
          </p>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "var(--color-admin-text-muted)" }}
          />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            style={{
              backgroundColor: "var(--color-admin-surface)",
              borderColor: "var(--color-admin-border)",
              color: "var(--color-admin-text)",
            }}
          />
        </div>
        <div
          className="flex items-center gap-6 text-sm"
          style={{ color: "var(--color-admin-text-muted)" }}
        >
          <span>
            <strong style={{ color: "var(--color-admin-text)" }}>
              {messages.length}
            </strong>{" "}
            total messages
          </span>
        </div>
      </div>

      {/* Messages */}
      {messages.length === 0 ? (
        <div
          className="text-center py-16 rounded-xl"
          style={{
            border: "2px dashed var(--color-admin-border)",
            backgroundColor: "var(--color-admin-surface)",
          }}
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: "var(--color-admin-accent-light)" }}
          >
            <Inbox
              className="h-8 w-8"
              style={{ color: "var(--color-admin-primary)" }}
            />
          </div>
          <h3
            className="text-lg font-medium mb-2"
            style={{ color: "var(--color-admin-text)" }}
          >
            No messages yet
          </h3>
          <p style={{ color: "var(--color-admin-text-muted)" }}>
            Contact form submissions will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Messages List */}
          <div
            className="lg:col-span-2 rounded-xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-admin-surface)",
              border: "1px solid var(--color-admin-border)",
            }}
          >
            <div
              className="max-h-[600px] overflow-y-auto divide-y"
              style={{ borderColor: "var(--color-admin-border)" }}
            >
              {filteredMessages.map((message) => (
                <div
                  key={message._id}
                  onClick={() => handleSelectMessage(message)}
                  className="p-4 cursor-pointer transition-all"
                  style={{
                    backgroundColor:
                      selectedMessage?._id === message._id
                        ? "color-mix(in srgb, var(--color-admin-primary) 10%, transparent)"
                        : !message.isRead
                        ? "color-mix(in srgb, var(--color-admin-accent-light) 30%, transparent)"
                        : "transparent",
                    borderLeft:
                      selectedMessage?._id === message._id
                        ? "2px solid var(--color-admin-primary)"
                        : "2px solid transparent",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{
                        backgroundColor: message.isRead
                          ? "var(--color-admin-bg)"
                          : "color-mix(in srgb, var(--color-admin-primary) 15%, transparent)",
                      }}
                    >
                      {message.isRead ? (
                        <MailOpen
                          className="h-4 w-4"
                          style={{ color: "var(--color-admin-text-muted)" }}
                        />
                      ) : (
                        <Mail
                          className="h-4 w-4"
                          style={{ color: "var(--color-admin-primary)" }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-medium truncate"
                          style={{
                            color: !message.isRead
                              ? "var(--color-admin-text)"
                              : "var(--color-admin-text-muted)",
                          }}
                        >
                          {message.fullName}
                        </span>
                        {!message.isRead && (
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor: "var(--color-admin-primary)",
                            }}
                          />
                        )}
                      </div>
                      <p
                        className="text-sm truncate mb-1"
                        style={{ color: "var(--color-admin-text-muted)" }}
                      >
                        {message.subject}
                      </p>
                      <div
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--color-admin-text-muted)" }}
                      >
                        <Clock className="h-3 w-3" />
                        {formatRelativeDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div
            className="lg:col-span-3 rounded-xl overflow-hidden min-h-[400px]"
            style={{
              backgroundColor: "var(--color-admin-surface)",
              border: "1px solid var(--color-admin-border)",
            }}
          >
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                {/* Detail Header */}
                <div
                  className="p-6"
                  style={{
                    borderBottom: "1px solid var(--color-admin-border)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2
                        className="text-lg font-semibold mb-2"
                        style={{ color: "var(--color-admin-text)" }}
                      >
                        {selectedMessage.subject}
                      </h2>
                      <div
                        className="flex items-center gap-4 text-sm"
                        style={{ color: "var(--color-admin-text-muted)" }}
                      >
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {selectedMessage.fullName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(selectedMessage.createdAt)}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMessage(null)}
                      className="lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                  </div>
                </div>

                {/* Contact Info */}
                <div
                  className="p-6"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--color-admin-accent-light) 30%, var(--color-admin-surface))",
                    borderBottom: "1px solid var(--color-admin-border)",
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "var(--color-admin-bg)" }}
                      >
                        <AtSign
                          className="h-4 w-4"
                          style={{ color: "var(--color-admin-text-muted)" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-admin-text-muted)" }}
                        >
                          Email
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-admin-text)" }}
                        >
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: "var(--color-admin-bg)" }}
                        >
                          <Phone
                            className="h-4 w-4"
                            style={{ color: "var(--color-admin-text-muted)" }}
                          />
                        </div>
                        <div>
                          <p
                            className="text-xs"
                            style={{ color: "var(--color-admin-text-muted)" }}
                          >
                            Phone
                          </p>
                          <p
                            className="text-sm"
                            style={{ color: "var(--color-admin-text)" }}
                          >
                            {selectedMessage.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 p-6 overflow-auto">
                  <div className="flex items-start gap-3">
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{ backgroundColor: "var(--color-admin-bg)" }}
                    >
                      <MessageSquare
                        className="h-4 w-4"
                        style={{ color: "var(--color-admin-text-muted)" }}
                      />
                    </div>
                    <p
                      className="whitespace-pre-wrap leading-relaxed"
                      style={{ color: "var(--color-admin-text-muted)" }}
                    >
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="p-6 flex gap-3"
                  style={{ borderTop: "1px solid var(--color-admin-border)" }}
                >
                  <Button
                    className="flex-1 text-white"
                    style={{ backgroundColor: "var(--color-admin-primary)" }}
                    onClick={() =>
                      (window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)
                    }
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Reply via Email
                  </Button>
                  <Button
                    variant="outline"
                    className="hover:bg-red-500/10 hover:text-red-500"
                    style={{
                      borderColor: "var(--color-admin-border)",
                      color: "var(--color-admin-text-muted)",
                    }}
                    onClick={() => handleDelete(selectedMessage._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{
                      backgroundColor: "var(--color-admin-accent-light)",
                    }}
                  >
                    <Mail
                      className="h-8 w-8"
                      style={{ color: "var(--color-admin-primary)" }}
                    />
                  </div>
                  <h3
                    className="text-lg font-medium mb-2"
                    style={{ color: "var(--color-admin-text)" }}
                  >
                    Select a message
                  </h3>
                  <p style={{ color: "var(--color-admin-text-muted)" }}>
                    Choose a message from the list to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
