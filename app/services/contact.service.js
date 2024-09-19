const { ObjectId, ReturnDocument } = require("mongodb");

class ContactService {
    constructor(client) {
            this.Contact = client.db().collection("contacts");
        }
        // Định nghĩa các phương thức truy xuất CSDL sử dụng Mongo API
    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undefined fields
        Object.keys(contact).forEach(
            (key) => (contact[key] === undefined ? delete contact[key] : null)

        );
        return contact;
    }
    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact, {
                $set: { favorite: contact.favorite === true }
            }, {
                ReturnDocument: "after",
                upset: true
            }
        );
        return result;
    }
}
module.exports = ContactService;